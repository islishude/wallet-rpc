declare namespace OmniLayer {
  /** spell-checker: disable */
  export interface clientInfo {
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

  export interface txInfo {
    txid: string;
    fee: string;
    // from
    sendingaddress: string;
    // to
    referenceaddress: string;
    // in rpc wallet?
    ismine: boolean;
    version: number;
    type_int: number;
    type: string;
    valid: boolean;
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
}
