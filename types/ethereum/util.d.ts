import BigNumber from "bignumber.js";
import { IEthAbiStruct } from "./rpc";
export declare class EthereumUtil {
    static readonly gWei: BigNumber;
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
    static hexToNumber(hex: string): number;
    static getRecommendGasPrice(apiKey?: string): Promise<string>;
    static padAddress(address: string): string;
    static toUtf8(hex: string): string;
    /**
     * validate eth address
     * @param address a checked eth address or not
     */
    static isAddress(address: string): boolean;
    /**
     * add `0x` to hex string
     * if param starts with `0x` would return origin
     * @param hex
     */
    static addHexPad(hex: string): string;
    /**
     * Get Eth Token ABI from EtherScan.io
     * @param token tokenAddress
     * @returns { status: string, message: string, result: string}
     * if status isn't "1" then the request is failed
     * the result is ABI JSON string,you should use JSON.parse()
     * type defined of ABI struct can be found in
     * defined/eth.d.ts  Ethereum.IAbiStruct
     */
    static getABI(token: string, apiKey?: string): Promise<IEthAbiStruct[] | null>;
    static hexToDecimalString(hex: string): string;
    static toWei(eth: number): string;
    static toEth(wei: string): string;
    static numberToHex(int: number): string;
}
