export default abstract class Client {
    user: string;
    pass: string;
    ip: string;
    port: number;
    constructor(user: string, pass: string, ip: string, port: number);
    protected rpc<T, D>(method: string, param?: T[], id?: string): Promise<D>;
}
