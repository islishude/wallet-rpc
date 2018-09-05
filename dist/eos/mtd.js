"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EOSMethods = {
    chain: {
        info: "chain/get_info",
        block: "chain/get_block",
        blockHeaderState: "chain/get_block_header_state",
        account: "chain/get_account",
        abi: "chain/get_abi",
        code: "chain/get_code",
        rawCodeAndABI: "chain/get_raw_code_and_abi",
        balance: "chain/get_currency_balance",
        sendTx: "chain/push_transaction",
        sendTxes: "chain/push_transactions"
    },
    history: {
        actions: "history/get_actions",
        tx: "history/get_transaction",
        keyAccounts: "history/get_key_accounts",
        ctrlAccounts: "history/get_controlled_accounts"
    },
    net: {
        connect: "net/connect",
        disconnect: "net/disconnect",
        connections: "net/connections",
        status: "net/status"
    },
    DBSize: {
        get: "/db_size/get"
    }
};
