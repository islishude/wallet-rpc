"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_js_1 = require("crypto-js");
exports.hexToNumber = (hex) => {
    if (hex === "0x") {
        return 0;
    }
    return Number.parseInt(hex);
};
exports.numberToHex = (int) => {
    return "0x" + int.toString(16);
};
exports.ERC20FuncSig = {
    allowance: "0xdd62ed3e",
    approve: "0x095ea7b3",
    balanceOf: "0x70a08231",
    decimals: "0x313ce567",
    name: "0x06fdde03",
    symbol: "0x95d89b41",
    totalSupply: "0x18160ddd",
    transfer: "0xa9059cbb",
    transferFrom: "0x23b872dd"
};
exports.isAddress = (address) => {
    return /^(0x)?[0-9a-f]{40}$/.test(address.toLowerCase());
};
exports.isChecksumAddress = (address) => {
    if (!exports.isAddress(address)) {
        return false;
    }
    const aHash = exports.sha3(address.replace("0x", "").toLowerCase());
    for (let i = 0; i < 40; i++) {
        const toNumber = Number.parseInt(aHash[i], 16);
        const upper = address[i].toUpperCase();
        if ((toNumber > 7 && upper !== address[i]) ||
            (toNumber <= 7 && upper !== address[i])) {
            return false;
        }
    }
    return true;
};
exports.sha3 = (message) => {
    return crypto_js_1.SHA3(message, { outputLength: 256 }).toString();
};
exports.padAddress = (address) => {
    if (!exports.isAddress(address)) {
        throw new Error("Not a valid address");
    }
    return "0".repeat(24) + address.replace("0x", "");
};
exports.toUtf8 = (hex) => {
    const result = Buffer.from(hex.replace("0x", ""), "hex")
        .toString()
        .match(/\w+/g);
    return result ? result.pop() : "";
};
exports.addressNull = "0x0000000000000000000000000000000000000000";
