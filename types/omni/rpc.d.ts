import Client from "../client";
export declare class OmniLayerClient extends Client {
    constructor(user: string, pass: string, ip: string, port?: number);
    getInfo(): Promise<import("../../defined/rpc").RPCResponse<OmniLayer.clientInfo>>;
    getBlockCount(): Promise<import("../../defined/rpc").RPCResponse<number>>;
    sendRawTx(fromAddress: string, rawTransaction: string, referenceAddress?: string, redeemAddress?: string, referenceAmount?: string): Promise<import("../../defined/rpc").RPCResponse<string>>;
    getBalance(address: string, propertyId: number): Promise<import("../../defined/rpc").RPCResponse<{
        balance: string;
        reserved: string;
    }>>;
    getAllBalance(address: string): Promise<import("../../defined/rpc").RPCResponse<{
        propertyid: number;
        balance: string;
        reserved: string;
    }[]>>;
    getTxInfo(txid: string): Promise<import("../../defined/rpc").RPCResponse<OmniLayer.txInfo>>;
    getTxList(height: number): Promise<import("../../defined/rpc").RPCResponse<string[]>>;
    getPendingTxList(address?: string): Promise<import("../../defined/rpc").RPCResponse<OmniLayer.txInfo[]>>;
    getProperty(id?: number): Promise<import("../../defined/rpc").RPCResponse<string>>;
}
