export interface Config {
    token: string;
    port: number;
    client: {
        id: string;
        secret: string;
    };
    db: {
        uri: string;
        options: {};
    };
    activity: {
        type: 'online' | 'idle' | 'dnd' | 'invisible';
        message: string;
    };
}