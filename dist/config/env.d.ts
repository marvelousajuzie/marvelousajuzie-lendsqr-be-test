export declare const config: {
    readonly env: string;
    readonly port: number;
    readonly database: {
        readonly host: string;
        readonly port: number;
        readonly user: string;
        readonly password: string;
        readonly name: string;
    };
    readonly jwt: {
        readonly secret: string;
        readonly expiresIn: string;
    };
    readonly karma: {
        readonly baseUrl: string;
        readonly apiKey: string;
    };
};
