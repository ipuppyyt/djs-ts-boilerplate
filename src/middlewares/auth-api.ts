import { Request, Response, NextFunction } from "express";
import { token } from "../utils";

export default (req: Request, res: Response, next: NextFunction): void => {
    try {
        const authorization = req.headers.authorization;

        if (!authorization || !authorization.startsWith("Bearer ")) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        const tkn = token.verify(authorization.replace("Bearer ", "").trim());

        if (tkn === null || tkn === undefined || !tkn) {
            res.status(400).json({ error: "Invalid Token" });
            return;
        }

        next();
    } catch {
        res.status(401).send({ error: "Unauthorized" });
    }
};
