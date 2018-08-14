"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OmniLayerMethods = {
    block: {
        count: "getblockcount",
        txList: "omni_listblocktransactions",
        pendingTxList: "omni_listpendingtransactions"
    },
    info: {
        client: "omni_getinfo"
    },
    property: {
        list: "omni_listproperties",
        info: "omni_getproperty"
    },
    address: {
        balance: "omni_getbalance"
    },
    tx: {
        decode: "",
        detail: "omni_gettransaction",
        raw: "",
        payload: "omni_getpayload",
        sendRaw: "omni_sendrawtx"
    }
};
