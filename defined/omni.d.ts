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
    amount: string;
    block: number;
    blockhash: string;
    blocktime: number;
    category: string;
    confirmations: number;
    data: string;
    divisible: boolean;
    ecosystem: string;
    fee: string;
    ismine: boolean;
    positioninblock: number;
    propertyid: number;
    propertyname: string;
    propertytype: string;
    sendingaddress: string;
    subcategory: string;
    txid: string;
    type: string;
    type_int: number;
    url: string;
    valid: boolean;
    version: number;
  }
}
