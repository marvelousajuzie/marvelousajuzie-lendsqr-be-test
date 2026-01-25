export declare class KarmaService {
    private baseUrl;
    private apiKey;
    constructor();
    checkBlacklist(identifier: string): Promise<boolean>;
    reportToBlacklist(identifier: string, reason: string): Promise<boolean>;
}
