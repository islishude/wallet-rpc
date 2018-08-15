import { BitcoinClient } from "../bitcoin/rpc";
export declare class OmniLayerClient extends BitcoinClient {
    constructor(user: string, pass: string, ip: string, port?: number);
    getOmniInfo(): Promise<import("../../defined/rpc").RPCResponse<OmniLayer.clientInfo>>;
    sendOmniRawTx(fromAddress: string, rawTransaction: string, referenceAddress?: string, redeemAddress?: string, referenceAmount?: string): Promise<import("../../defined/rpc").RPCResponse<string>>;
    getPropertyBalance(address: string, propertyId: number): Promise<import("../../defined/rpc").RPCResponse<{
        balance: string;
        reserved: string;
    }>>;
    getAllPropertyBalance(address: string): Promise<import("../../defined/rpc").RPCResponse<{
        propertyid: number;
        balance: string;
        reserved: string;
    }[]>>;
    getOmniTxInfo(txid: string): Promise<import("../../defined/rpc").RPCResponse<OmniLayer.txInfo>>;
    getOmniTxList(height: number): Promise<import("../../defined/rpc").RPCResponse<string[]>>;
    getOmniPendingTxList(address?: string): Promise<import("../../defined/rpc").RPCResponse<OmniLayer.txInfo[]>>;
    getOmniProperty(id?: number): Promise<import("../../defined/rpc").RPCResponse<string>>;
}
