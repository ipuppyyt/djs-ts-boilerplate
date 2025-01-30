import type { getCookieProps, setCookieProps } from "../types";

export const getCookie = ({ name }: getCookieProps) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
}

export const setCookie = ({ name, value, time, path, SameSite = 'Strict', Secure = true, priority }: setCookieProps) => {
    document.cookie = `${name}=${value}; max-age=${time}; path=${path || '/'}; SameSite=${SameSite}; Secure=${Secure}; priority=${priority || 'medium'};`;
}


export const deleteCookie = ({ name }: getCookieProps) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}