import { secureStorage } from "./secureStorage";

export const setSessionCache = <T>(key: string, data: T, cacheTime = 10): void => {
    const expiry = new Date().getTime() + cacheTime * 60 * 1000;
    const sessionData = JSON.stringify({ value: data, expiry });
    secureStorage.setItem(key, sessionData);
};

export const getSessionCache = async <T>(key: string): Promise<T | undefined> => {
    const sessionData = secureStorage.getItem(key);
    if (sessionData) {
        const { value, expiry } = JSON.parse(sessionData);
        if (new Date().getTime() < expiry) {
            return value;
        } else {
            secureStorage.removeItem(key);
        }
    }
    return undefined;
};