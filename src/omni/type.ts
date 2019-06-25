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

export interface IOmniPropertyBalance {
  balance: string;
  reserved: string;
  frozen: string;
}
