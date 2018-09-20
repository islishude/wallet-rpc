import { BitcoinMethods } from "../bitcoin/mtd";
import { BitcoinClient } from "../bitcoin/rpc";
import { IRpcConfig } from "../client";
import { OmniLayerMethods as mtd } from "./mtd";

/** spell-checker: disable */
export interface IOmniClientInfo {
  omnicoreversion_int: number;
  omnicoreversion: string;
  mastercoreversion: string;
  bitcoincoreversion: string;
  commitinfo: string;
  block: number;
  blocktime: number;
  blocktransactions: number;
  totaltransactions: number;
  alerts: Array<{
    alerttype: number;
    alertype: string;
    alertexpiry: string;
    alertmessage: string;
  }>;
}

export interface IOmniTxInfo {
  txid: string;
  fee: number;
  // from
  sendingaddress: string;
  // to
  referenceaddress: string;
  // in rpc wallet?
  ismine: boolean;
  version: number;
  type_int: number;
  type: string;
  valid?: boolean;
  invalidreason?: string;
  block: number;
  confirmations: number;

  propertyid: number;
  propertyname: string;
  divisible: boolean;
  amount: string;

  blockhash: string;
  blocktime: number;
  positioninblock: number;

  // CrowSale Purchase
  // purchasedpropertyid?: number;
  // purchasedpropertyname?: string;
  // purchasedpropertydivisible?: boolean;
  // purchasedtokens?: string;
  // issuertokens?: string;
  // ...
}

export interface IOmniPropertyInfo {
  propertyid: number; // (number) the identifier
  name: string; // (string) the name of the tokens
  category: string; // (string) the category used for the tokens
  subcategory: string; // (string) the subcategory used for the tokens
  data: string; // (string) additional information or a description
  url: string; // (string) an URI, for example pointing to a website
  divisible: boolean; // (boolean) whether the tokens are divisible
  issuer: string; // (string) the Bitcoin address of the issuer on record
  creationtxid: string; // (string) the hex-encoded creation transaction hash
  fixedissuance: boolean; // (boolean) whether the token supply is fixed
  managedissuance: boolean; // (boolean) whether the token supply is managed by the issuer
  freezingenabled: boolean; // (boolean) whether freezing is enabled for the property (managed properties only)
  totaltokens: string; // (string) the total number of tokens in existence
}

export class OmniLayerClient extends BitcoinClient {
  constructor(conf: IRpcConfig = {}) {
    super(conf);
  }

  public getOmniInfo() {
    return this.RpcCall<IOmniClientInfo>(mtd.info.client);
  }

  public sendRawTx(data: string) {
    return this.RpcCall<string>(BitcoinMethods.tx.sendRaw, [data]);
  }

  /**
   * Broadcasts a raw Omni Layer transaction.
   * Use `this.sendRawTx` for anyone instead of sendOmniRawTx
   * @param fromAddress the address to send from
   * @param rawTransaction	the hex-encoded raw transaction
   * @param referenceAddress a reference address (none by default)
   * @param redeemAddress an address that can spend the transaction dust (sender by default)
   * @param referenceAmount a bitcoin amount that is sent to the receiver (minimal by default)
   */
  public sendOmniRawTx(
    fromAddress: string,
    rawTransaction: string,
    referenceAddress?: string,
    redeemAddress?: string,
    referenceAmount?: string
  ) {
    /**
     * if last three params is undefined,the request data will change it to null
     * OmniLayer RPC will resolve it to empty string => ""
     * @see https://github.com/OmniLayer/omnicore/blob/master/src/omnicore/rpctx.cpp#L57
     * @see https://github.com/OmniLayer/omnicore/blob/master/src/omnicore/rpcvalues.cpp#L35
     */
    const params: any[] = [
      fromAddress,
      rawTransaction,
      referenceAddress,
      redeemAddress,
      referenceAmount
    ];
    return this.RpcCall<string>(mtd.tx.sendRaw, params);
  }

  /**
   * Returns the token balance for a given address and property.
   * @param address the address
   * @param propertyId the property identifier
   */
  public getPropertyBalance(address: string, propertyId: number) {
    return this.RpcCall<{ balance: string; reserved: string }>(
      mtd.address.balance,
      [address, propertyId]
    );
  }

  public getAllPropertyBalance(address: string) {
    type tmp = Array<{ propertyid: number; balance: string; reserved: string }>;
    return this.RpcCall<tmp>(mtd.address.allBalance, [address]);
  }

  /**
   * Get detailed information about an Omni transaction.
   * @param txid the hash of the transaction to lookup
   */
  public getOmniTxInfo(txid: string) {
    return this.RpcCall<IOmniTxInfo>(mtd.tx.detail, [txid]);
  }

  /**
   * Lists all Omni transactions in a block.
   * @param height the block height or block index
   */
  public getOmniTxList(height: number) {
    return this.RpcCall<string[]>(mtd.tx.list, [height]);
  }

  public getOmniPendingTxList(address?: string) {
    return this.RpcCall<IOmniTxInfo[]>(mtd.tx.pending, [address]);
  }

  /**
   * Returns details for about the tokens or smart property to lookup.
   * @param id property id default is USDT
   */
  public getOmniProperty(id: number = 31) {
    return this.RpcCall<IOmniPropertyInfo>(mtd.property.info, [id]);
  }

  /**
   * List WALLET transactions, optionally filtered by an address and block boundaries.
   * !! only your wallet tx list !!
   * @param txid	string	optional	address filter (default: "*")
   * @param count	number	optional	show at most n transactions (default: 10)
   * @param skip	number	optional	skip the first n transactions (default: 0)
   * @param startBlock	number	optional	first block to begin the search (default: 0)
   * @param endBlock	number	optional	last block to include in the search (default: 999999)
   */
  public listTx(
    txid = "*",
    count = 10,
    skip = 0,
    startBlock = 0,
    endBlock = 999999
  ) {
    const params: any[] = [txid, count, skip, startBlock, endBlock];
    return this.RpcCall<IOmniTxInfo[]>(mtd.tx.wallet, params);
  }
}
