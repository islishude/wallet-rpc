import { log } from "console";
import { EOSClient } from "../src/eos/rpc";

const eos = new EOSClient("https://eos.oasisgo.net:3852");

async function test() {
  const NetAndCpuPrice = await eos.getNetAndCpuPrice();
  log(NetAndCpuPrice);

  const RamPrice = await eos.getRAMPrice();
  log(RamPrice);

  const producerList = await eos.getProducerList(2);
  log(producerList);
}

test().catch(log);
