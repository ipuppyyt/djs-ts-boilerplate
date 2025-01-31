import { Config } from '../types';
import dotenv from 'dotenv';
import env from './env';
dotenv.config();

const config: Config = {
    token: env.TOKEN,
    port: 3001,
    client: {
        id: env.CLIENT_ID,
        secret: env.CLIENT_SECRET,
    },
    db: {
        uri: env.MONGODB_URI,
        options: {}
    },
    owner: env.OWNER_ID,
    developers: [],
    activity: {
        type: 'online',
        message: 'Hey I am a bot!'
    }
}

export default config;