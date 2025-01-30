import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY as string;

export const secureStorage = {
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

    setItem: (key: string, data: any): void => {
        const encrypted = secureStorage.encrypt(data);
        sessionStorage.setItem(key, encrypted);
    },

    getItem: (key: string): any => {
        const encrypted = sessionStorage.getItem(key);
        if (!encrypted) return null;
        return secureStorage.decrypt(encrypted);
    },

    removeItem: (key: string): void => {
        sessionStorage.removeItem(key);
    }
};