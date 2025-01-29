import jwt from 'jsonwebtoken';
import { config } from '../config';

export default {
    generate: (options: jwt.SignOptions) => {
        const token = jwt.sign({}, config.client.secret, options);
        return token;
    },

    verify: (token: string) => {
        if (!token) return null;

        try {
            const decoded = jwt.verify(token, config.client.secret);
            return decoded;
        } catch (error) {
            return null;
        }
    }
};