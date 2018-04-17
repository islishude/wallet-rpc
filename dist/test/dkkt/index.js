"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../..");
const user = "dkktrpc";
const pass = "EHtzSmhj6Yq6xzJPTJgRwZPLBVXxZtHiMgXLFDYLfxGwD";
const ip = "192.168.0.137";
const port = 28880;
const dkkt = new __1.DKKTClient(user, pass, ip, port);
dkkt
    .getInfo()
    .then(info => {
    console.log(info);
})
    .catch(err => {
    console.log("getInfo failed");
});
dkkt
    .getBlockCount()
    .then(info => {
    console.log(info);
})
    .catch(err => {
    console.log("getBlockCount failed");
});
