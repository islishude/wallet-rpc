export const EOSMethods = {
  DBSize: {
    get: "/db_size/get"
  },
  chain: {
    abi: "chain/get_abi",
    account: "chain/get_account",
    balance: "chain/get_currency_balance",
    block: "chain/get_block",
    blockHeaderState: "chain/get_block_header_state",
    code: "chain/get_code",
    info: "chain/get_info",
    rawCodeAndABI: "chain/get_raw_code_and_abi",
    sendTx: "chain/push_transaction",
    sendTxes: "chain/push_transactions"
  },
  history: {
    actions: "history/get_actions",
    ctrlAccounts: "history/get_controlled_accounts",
    keyAccounts: "history/get_key_accounts",
    tx: "history/get_transaction"
  },
  net: {
    connect: "net/connect",
    connections: "net/connections",
    disconnect: "net/disconnect",
    status: "net/status"
  }
};
