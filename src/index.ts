import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { CustomDiscordClient } from './types';
import rateLimit from 'express-rate-limit';
import session from 'express-session';
import { auth } from './middlewares';
import bodyParser from 'body-parser';
import { config } from './config';
import token from './api/token';
import mongoose from 'mongoose';
import logger from './logger';
import express from 'express';
import path from 'path';
import cors from 'cors';
import api from './api';
import fs from 'fs';

const client: CustomDiscordClient = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.AutoModerationConfiguration,
        GatewayIntentBits.AutoModerationExecution,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});
const app = express();

client.commands = new Collection();

// Connect to MongoDB
mongoose.connect(config.db.uri)
    .then(() => logger.success('MONGO', 'Connected'))
    .catch((err) => logger.fail('MONGO', err.message));

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 15 minutes window
    max: 50, // limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again later.', 
    headers: true, // Send custom headers
    statusCode: 429 // Status code
});

// Set up the express app
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: config.client.secret, resave: false, saveUninitialized: true, cookie: { secure: true } }));
app.use(limiter);
app.use(express.static(path.join(__dirname, './dist')));

app.use('/api', auth, api(client));
app.use('/auth/token', token());

app.get(`/*`, function (req, res) {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Load commands
const commandsPath = path.join(__dirname, 'commands');
if (!fs.existsSync(commandsPath)) fs.mkdirSync(commandsPath);
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const commandModule = require(filePath);
    const command = commandModule[Object.keys(commandModule)[0]];
    if (command.command === false) continue;
    if (command.data && command.execute) { client.commands.set(command.data.name, command) }
    else { logger.error(`The command at ${filePath} is missing a required "data" or "execute" property.`) }
}

// Load events
const eventsPath = path.join(__dirname, 'events');
if (!fs.existsSync(eventsPath)) fs.mkdirSync(eventsPath);
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.ts'));
for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const eventModule = require(filePath);
    const event = eventModule[Object.keys(eventModule)[0]];
    if (event.once) { client.once(event.name, (...args) => event.execute(...args, client)) }
    else { client.on(event.name, (...args) => event.execute(...args, client)) }
}

// Load handlers
const handlersPath = path.join(__dirname, 'handlers');
if (!fs.existsSync(handlersPath)) fs.mkdirSync(handlersPath);
const handlerFiles = fs.readdirSync(handlersPath).filter(file => file.endsWith('.ts'));
for (const file of handlerFiles) {
    const filePath = path.join(handlersPath, file);
    const handlerModule = require(filePath);
    const handler = handlerModule[Object.keys(handlerModule)[0]];
    if (handler.name && handler.execute) { client.on(handler.name, (...args) => handler.execute(...args, client)) }
    else { logger.error(`The handler at ${filePath} is missing a required "name" or "execute" property.`) }
}

// Add error handling
client.on('error', error => logger.error(error.message));
client.on('unhandledRejection', error => logger.fail('UNHANDLED', error.message));
client.on('warn', warning => logger.warning('WARN', warning));

app.listen(config.port, () => { logger.clear(); logger.event('API', `http://localhost:${config.port}`) });
if (config.token) client.login(config.token);
else { logger.error('No token provided'); process.exit(0); }