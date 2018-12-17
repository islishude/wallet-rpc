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
    sendingaddress: string;
    referenceaddress: string;
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
}
export interface IOmniPropertyInfo {
    propertyid: number;
    name: string;
    category: string;
    subcategory: string;
    data: string;
    url: string;
    divisible: boolean;
    issuer: string;
    creationtxid: string;
    fixedissuance: boolean;
    managedissuance: boolean;
    freezingenabled: boolean;
    totaltokens: string;
}
