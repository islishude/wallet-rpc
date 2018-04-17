import * as MyIfc from "./interface";
export default class DKKTClient implements MyIfc.Client {
    user: string;
    pass: string;
    rpcIp: string;
    rpcPort: number;
    protected auth: MyIfc.Auth;
    constructor(user: string, pass: string, rpcIp: string, rpcPort: number);
    protected rpc<T, D>(method: string, param?: T[], id?: string): Promise<D>;
    getInfo(): Promise<MyIfc.RPC>;
    getBlockCount(): Promise<string>;
    getBlockHash(height: number): Promise<MyIfc.RPC>;
    getBlock(blockId: string): Promise<MyIfc.getBlockInfo>;
    getTxInfo(txId: string): Promise<MyIfc.getTxInfoRes>;
    sendRawTx(tx: string, id: string): Promise<string>;
}
