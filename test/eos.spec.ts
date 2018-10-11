import { log } from "console";
import { EOSClient } from "../src/eos/rpc";

const eos = new EOSClient("https://mainnet.eoscanada.com");

async function test() {
  const NetAndCpuPrice = await eos.getNETAndCPUPrice();
  log(NetAndCpuPrice);

  const RamPrice = await eos.getRAMPrice();
  log(RamPrice);
}

test().catch(log);
