import { Request, Response, Router } from "express";
import generate from "./generate";

const router = Router();

export default () => {
    router.post('/generate', generate);
    
    router.get('*', (req: Request, res: Response) => {
        res.status(401).send('You really thought you can 🤣.')
    });
    router.post('*', (req: Request, res: Response) => {
        res.status(401).send('You really thought you can 🤣.')
    });

    return router;
}