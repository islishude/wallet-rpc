import { IEthAbiStruct } from "./type";
export declare class EthereumUtil {
    static readonly ERC20FuncSig: {
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
    static readonly ERC20FuncSigUpper: {
        DECIMALS: string;
        NAME: string;
        SYMBOL: string;
    };
    static readonly ERC20EventSig: {
        Approve: string;
        Transfer: string;
    };
    static readonly ERC721FunSig: {
        name: string;
        safeTransferFrom: string;
        safeTransferFromWithData: string;
        symbol: string;
        totalSupply: string;
        transferFrom: string;
    };
    /**
     * address(0)
     */
    static readonly addressNull: string;
    /**
     * Pad ethereum address to 64 bits hex string without 0x prefix
     * Can be use for ERC20 transfer call and ERC20 balance call
     */
    static padAddress(address: string): string;
    /**
     * transform Hex string to UTF8-encoding and trim string
     * @param raw hex string that can be prefix with `0x`
     */
    static toUtf8(raw: string): string;
    static decodeABIString(raw: string): string;
    static decodeABINumber(raw: string): number;
    /**
     * check eth address is valid or not
     */
    static isAddress(address: string): boolean;
    /**
     * add `0x` prefix to hex string
     * if param starts with `0x` would return origin
     */
    static addHexPrefix(hex: string): string;
    /**
     * Get Eth Token ABI from EtherScan.io
     * if status isn't "1" then the request is failed
     * the result is ABI JSON string,you should use JSON.parse()
     * type defined of ABI struct can be found in
     * defined/eth.d.ts  Ethereum.IAbiStruct
     */
    static getABI(token: string, apiKey?: string): Promise<IEthAbiStruct[] | null>;
    static rmHexPrefix(raw: string): string;
}
