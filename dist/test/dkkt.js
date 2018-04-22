"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dkkt_1 = require("../dkkt");
const user = "dkktrpc";
const pass = "EHtzSmhj6Yq6xzJPTJgRwZPLBVXxZtHiMgXLFDYLfxGwD";
const ip = "192.168.0.137";
const port = 28880;
const dkkt = new dkkt_1.default(user, pass, ip, port);
dkkt
    .getInfo()
    .then(info => {
})
    .catch(err => {
    console.log("getInfo failed");
});
dkkt
    .getBlockCount()
    .then(info => {
})
    .catch(err => {
    console.log("getBlockCount failed");
});
dkkt
    .getTxInfo("648da57bf7b1c8189c0d2637ecf48856eafbd309b73d78ccd0bf5581ed51164b")
    .then(info => {
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
})
    .catch(err => {
    console.log("getBlock failed");
});
