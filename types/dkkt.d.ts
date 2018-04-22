import Client from "./client";
import { DKKT } from "../defined/dkkt";
import { NumRPC, StrRPC } from "../defined/rpc";
export default class DKKTClient extends Client {
    constructor(user: string, pass: string, ip: string, port: number);
    getInfo(): Promise<DKKT.getInfoRes>;
    getBlockCount(): Promise<NumRPC>;
    getBlockHash(height: number): Promise<StrRPC>;
    getBlockInfo(id: string): Promise<DKKT.getBlockInfo>;
    getTxInfo(id: string): Promise<DKKT.getTxInfoRes>;
    sendRawTx(raw: string): Promise<string>;
}
