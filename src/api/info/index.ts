import { Client } from 'discord.js';
import botstats from './botstats';
import { Router } from 'express';

const router = Router();

export default (client: Client) => {
    router.get('/', botstats(client));

    router.get('*', (req, res) => {
        res.status(401).send('You really thought you can 🤣.');
    });
    router.post('*', (req, res) => {
        res.status(401).send('You really thought you can 🤣.');
    });
    return router;
};