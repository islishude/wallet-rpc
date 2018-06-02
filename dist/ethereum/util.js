"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_js_1 = require("crypto-js");
const utf8_1 = require("utf8");
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
exports.isAddress = address => {
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
        return false;
    }
    else if (/^(0x)?[0-9a-f]{40}$/.test(address) ||
        /^(0x)?[0-9A-F]{40}$/.test(address)) {
        return true;
    }
    else {
        return exports.isChecksumAddress(address);
    }
};
exports.isChecksumAddress = (address) => {
    address = address.replace("0x", "");
    const addressHash = exports.sha3(address.toLowerCase());
    for (let i = 0; i < 40; i++) {
        if ((parseInt(addressHash[i], 16) > 7 &&
            address[i].toUpperCase() !== address[i]) ||
            (parseInt(addressHash[i], 16) <= 7 &&
                address[i].toLowerCase() !== address[i])) {
            return false;
        }
    }
    return true;
};
exports.sha3 = (message) => {
    return crypto_js_1.SHA3(message, { outputLength: 256 }).toString();
};
exports.padAddress = (address) => {
    address = address.replace("0x", "");
    const res = "0".repeat(24) + address;
    return res;
};
exports.toUtf8 = (hex) => {
    let str = "";
    let i = 0;
    const l = hex.length;
    if (hex.substring(0, 2) === "0x") {
        i = 2;
    }
    for (; i < l; i += 2) {
        const code = parseInt(hex.substr(i, 2), 16);
        if (code === 0) {
            break;
        }
        str += String.fromCharCode(code);
    }
    return utf8_1.decode(str);
};
