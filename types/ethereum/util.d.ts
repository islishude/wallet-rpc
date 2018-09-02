import { IEthAbiStruct } from "./rpc";
export declare const hexToNumber: (hex: string) => number;
export declare const hexToDecimalString: (hex: string) => string;
export declare const toWei: (eth: number) => string;
export declare const toEth: (wei: string) => string;
export declare const numberToHex: (int: number) => string;
export declare const addHexPad: (hex: string) => string;
export declare const ERC20FuncSig: {
    allowance: string;
    approve: string;
    balanceOf: string;
    decimals: string;
    name: string;
    symbol: string;
    totalSupply: string;
    transfer: string;
    transferFrom: string;
};
export declare const ERC20FuncSigUpper: {
    DECIMALS: string;
    NAME: string;
    SYMBOL: string;
};
export declare const ERC20EventSig: {
    Approve: string;
    Transfer: string;
};
export declare const ERC721FunSig: {
    name: string;
    symbol: string;
    totalSupply: string;
    safeTransferFrom: string;
    safeTransferFromWithData: string;
    transferFrom: string;
};
export declare const isAddress: (address: string) => boolean;
export declare const padAddress: (address: string) => string;
export declare const toUtf8: (hex: string) => string;
export declare const addressNull = "0x0000000000000000000000000000000000000000";
/**
 * Get Eth Token ABI from EtherScan.io
 * @param token tokenAddress
 * @returns { status: string, message: string, result: string}
 * if status isn't "1" then the request is failed
 * the result is ABI JSON string,you should use JSON.parse()
 * type defined of ABI struct can be found in
 * defined/eth.d.ts => Ethereum.IAbiStruct
 */
export declare const getABI: (token: string, apiKey?: string) => Promise<IEthAbiStruct[] | null>;
