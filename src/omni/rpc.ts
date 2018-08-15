import { BitcoinClient } from "../bitcoin/rpc";
import { OmniLayerMethods as mtd } from "./mtd";

export class OmniLayerClient extends BitcoinClient {
  constructor(user: string, pass: string, ip: string, port: number = 8332) {
    super(user, pass, ip, port);
  }

  public getOmniInfo() {
    return this.RpcCall<OmniLayer.clientInfo>(mtd.info.client);
  }

  /**
   * Broadcasts a raw Omni Layer transaction.
   * Use `BitcoinClientInstance.sendRawTx` for anyone instead of sendOmniRawTx
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
    return this.RpcCall<OmniLayer.txInfo>(mtd.tx.detail, [txid]);
  }

  /**
   * Lists all Omni transactions in a block.
   * @param height the block height or block index
   */
  public getOmniTxList(height: number) {
    return this.RpcCall<string[]>(mtd.tx.list, [height]);
  }

  public getOmniPendingTxList(address?: string) {
    return this.RpcCall<OmniLayer.txInfo[]>(mtd.tx.pending, [address]);
  }

  /**
   * Returns details for about the tokens or smart property to lookup.
   * @param id property id default is USDT
   */
  public getOmniProperty(id: number = 31) {
    return this.RpcCall(mtd.property.info, [id]);
  }
}
