
import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY as string;

export const local = {
    encrypt: (data: any): string => {
        return CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString();
    },

    decrypt: (encryptedData: string): any => {
        try {
            const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
            const decrypted = bytes.toString(CryptoJS.enc.Utf8);
            return JSON.parse(decrypted);
        } catch (error) {
            console.error('Decryption failed:', error);
            return null;
        }
    },

    set: (key: string, data: any): void => {
        const encrypted = local.encrypt(data);
        localStorage.setItem(key, encrypted);
    },

    get: (key: string): any => {
        const encrypted = localStorage.getItem(key);
        if (!encrypted) return null;
        return local.decrypt(encrypted);
    },

    remove: (key: string): void => {
        localStorage.removeItem(key);
    }
};