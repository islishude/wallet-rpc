import Client from "../client";
import { OmniLayerMethods as mtd } from "./mtd";

export class OmniLayerClient extends Client {
  constructor(user: string, pass: string, ip: string, port: number = 8332) {
    super(user, pass, ip, port);
  }

  public getInfo() {
    return this.RpcCall<OmniLayer.clientInfo>(mtd.info.client);
  }

  public getBlockCount() {
    return this.RpcCall<number>(mtd.block.count);
  }

  /**
   * Broadcasts a raw Omni Layer transaction.
   * @param fromAddress the address to send from
   * @param rawTransaction	the hex-encoded raw transaction
   * @param referenceAddress a reference address (none by default)
   * @param redeemAddress an address that can spend the transaction dust (sender by default)
   * @param referenceAmount a bitcoin amount that is sent to the receiver (minimal by default)
   */
  public sendRawTx(
    fromAddress: string,
    rawTransaction: string,
    referenceAddress?: string,
    redeemAddress?: string,
    referenceAmount?: string
  ) {
    const params: string[] = [fromAddress, rawTransaction];
    if (referenceAddress !== undefined) {
      params.push(referenceAddress);
    }

    if (redeemAddress !== undefined) {
      params.push(redeemAddress);
    }

    if (referenceAmount !== undefined) {
      params.push(referenceAmount);
    }
    return this.RpcCall<string>(mtd.tx.sendRaw, params);
  }

  /**
   * Returns the token balance for a given address and property.
   * @param address the address
   * @param propertyId the property identifier
   */
  public getBalance(address: string, propertyId: number) {
    return this.RpcCall<{ balance: string; reserved: string }>(
      mtd.address.balance,
      [address, propertyId]
    );
  }

  /**
   * Get detailed information about an Omni transaction.
   * @param txid the hash of the transaction to lookup
   */
  public getTxInfo(txid: string) {
    return this.RpcCall<OmniLayer.txInfo>(mtd.tx.detail, [txid]);
  }

  /**
   * Lists all Omni transactions in a block.
   * @param height the block height or block index
   */
  public getTxList(height: number) {
    return this.RpcCall<string[]>(mtd.tx.list, [height]);
  }

  public getPendingTxList(address?: string) {
    return this.RpcCall<OmniLayer.txInfo[]>(mtd.tx.pending, [address]);
  }

  /**
   * Returns details for about the tokens or smart property to lookup.
   * @param id property id default is USDT
   */
  public getProperty(id: number = 31) {
    return this.RpcCall(mtd.property.info, [id]);
  }
}
