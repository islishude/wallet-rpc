import { assert, log } from "console";
import { DKKTClient, RPCMethods } from "../src";

const user: string = "dkkt";
const pass: string = "password";
const ip: string = "192.168.0.185";
const port: number = 28880;

const dkkt = new DKKTClient(user, pass, ip, port);

dkkt.BulkAdd(RPCMethods.BtcMtd.getBlockCount);
dkkt.BulkAdd(RPCMethods.BtcMtd.getBlockCount);
dkkt.BulkAdd(RPCMethods.BtcMtd.getBlockCount);


dkkt.BulkRpcCall().then(log, log)

dkkt.BulkAdd(RPCMethods.BtcMtd.getInfo);
dkkt.BulkRpcCall().then(log, log)