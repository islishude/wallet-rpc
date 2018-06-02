export declare const hexToNumber: (hex: string) => number;
export declare const numberToHex: (int: number) => string;
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
export declare const isAddress: (address: any) => boolean;
export declare const isChecksumAddress: (address: string) => boolean;
export declare const sha3: (message: string) => string;
export declare const padAddress: (address: string) => string;
export declare let toUtf8: (hex: string) => string;
