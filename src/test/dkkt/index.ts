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
    console.log(info.result);
  })
  .catch(err => {
    console.log("getBlockCount failed");
  });
