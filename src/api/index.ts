import { Client } from 'discord.js';
import { Request, Response, Router } from 'express';
import info from './info';

const router = Router();

export default (client: Client) => {
    router.use('/info', info(client));
    // router.use('/auth', require('./auth'));
    // router.use('/tebex', require('./tebex'));

    router.get('*', (req: Request, res: Response) => {
        res.status(401).send('You really thought you can 🤣.');
    });
    router.post('*', (req: Request, res: Response) => {
        res.status(401).send('You really thought you can 🤣.');
    });

    return router;
};