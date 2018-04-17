import { DKKTClient } from "../..";

const user: string = "dkktrpc";
const pass: string = "EHtzSmhj6Yq6xzJPTJgRwZPLBVXxZtHiMgXLFDYLfxGwD";
const ip: string = "192.168.0.137";
const port: number = 28880;

const dkkt = new DKKTClient(user, pass, ip, port);

dkkt
  .getInfo()
  .then(info => {
    // const t1 = info.result.version
  })
  .catch(err => {
    console.log("getInfo failed");
  });

dkkt
  .getBlockCount()
  .then(info => {
    // console.log(info.result);
  })
  .catch(err => {
    console.log("getBlockCount failed");
  });

dkkt
  .getTxInfo("648da57bf7b1c8189c0d2637ecf48856eafbd309b73d78ccd0bf5581ed51164b")
  .then(info => {
    // info.result.vin[0].vout
  })
  .catch(err => {
    console.log("getBlockCount failed");
  });

dkkt
  .getBlockHash(400)
  .then(info => {
    console.assert(typeof info.result === "string");
  })
  .catch(err => {
    console.log("getBlockHash failed");
  });

dkkt
  .getBlockCount()
  .then(info => {
    console.assert(typeof info.result === "number");
  })
  .catch(err => {
    console.log("getBlockCount failed");
  });

dkkt
  .getBlockInfo("f928c887ce1efc876c1c653a910d11861f1af0f2dbe42aadf8f5acbb829449cf")
  .then(info => {
    // info.result
  })
  .catch(err => {
    console.log("getBlock failed");
  });
