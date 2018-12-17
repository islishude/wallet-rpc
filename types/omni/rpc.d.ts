import { BitcoinClient } from "../bitcoin/rpc";
import { IRpcConfig } from "../client";
import { IOmniClientInfo, IOmniPropertyInfo, IOmniTxInfo } from "./type";
export declare class OmniLayerClient extends BitcoinClient {
    constructor(conf?: IRpcConfig);
    getOmniInfo(): Promise<import("../client").IRpcResponse<IOmniClientInfo>>;
    sendRawTx(data: string): Promise<import("../client").IRpcResponse<string>>;
    /**
     * Broadcasts a raw Omni Layer transaction.
     * Use `this.sendRawTx` for anyone instead of sendOmniRawTx
     * @param fromAddress the address to send from
     * @param rawTransaction	the hex-encoded raw transaction
     * @param referenceAddress a reference address (none by default)
     * @param redeemAddress an address that can spend the transaction dust (sender by default)
     * @param referenceAmount a bitcoin amount that is sent to the receiver (minimal by default)
     */
    sendOmniRawTx(fromAddress: string, rawTransaction: string, referenceAddress?: string, redeemAddress?: string, referenceAmount?: string): Promise<import("../client").IRpcResponse<string>>;
    /**
     * Returns the token balance for a given address and property.
     * @param address the address
     * @param propertyId the property identifier
     */
    getPropertyBalance(address: string, propertyId?: number): Promise<import("../client").IRpcResponse<{
        balance: string;
        reserved: string;
        frozen: string;
    }>>;
    getAllPropertyBalance(address: string): Promise<import("../client").IRpcResponse<{
        propertyid: number;
        balance: string;
        reserved: string;
    }[]>>;
    /**
     * Get detailed information about an Omni transaction.
     * @param txid the hash of the transaction to lookup
     */
    getOmniTxInfo(txid: string): Promise<import("../client").IRpcResponse<IOmniTxInfo>>;
    /**
     * Lists all Omni transactions in a block.
     * @param height the block height or block index
     */
    getOmniTxList(height: number): Promise<import("../client").IRpcResponse<string[]>>;
    getOmniPendingTxList(address?: string): Promise<import("../client").IRpcResponse<IOmniTxInfo[]>>;
    /**
     * Returns details for about the tokens or smart property to lookup.
     * @param id property id default is USDT
     */
    getOmniProperty(id?: number): Promise<import("../client").IRpcResponse<IOmniPropertyInfo>>;
    /**
     * List WALLET transactions, optionally filtered by an address and block boundaries.
     * !! only your wallet tx list !!
     * @param txid	string	optional	address filter (default: "*")
     * @param count	number	optional	show at most n transactions (default: 10)
     * @param skip	number	optional	skip the first n transactions (default: 0)
     * @param startBlock	number	optional	first block to begin the search (default: 0)
     * @param endBlock	number	optional	last block to include in the search (default: 999999)
     */
    listTx(txid?: string, count?: number, skip?: number, startBlock?: number, endBlock?: number): Promise<import("../client").IRpcResponse<IOmniTxInfo[]>>;
}
