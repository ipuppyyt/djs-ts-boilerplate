export interface getCookieProps {
    name: string;
}

export interface setCookieProps {
    name: string;
    value: string;
    time: number;
    path?: string;
    SameSite?: 'Strict' | 'Lax' | 'None';
    Secure?: boolean;
    priority?: 'high' | 'low' | 'medium';
}