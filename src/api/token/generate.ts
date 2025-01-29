import { Request, Response } from "express";
import { token } from "../../utils";
import jwt from "jsonwebtoken";

export default (req: Request, res: Response) => {
    try {
        const options: jwt.SignOptions = {
            expiresIn: 120,
        };
        const tkn = token.generate(options);
        res.status(200).send({ token: tkn });
    } catch (error) {
        res.status(400).send({ error: 'Error generating token' });
    }
};