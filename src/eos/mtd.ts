/** spell-checker: disable */
export const EOSMethods = {
  DBSize: {
    get: "get"
  },
  chain: {
    abi: "get_abi",
    account: "get_account",
    atob: "abi_json_to_bin",
    balance: "get_currency_balance",
    block: "get_block",
    blockHeaderState: "get_block_header_state",
    btoa: "abi_bin_to_json",
    code: "get_code",
    info: "get_info",
    rawCodeAndABI: "get_raw_code_and_abi",
    sendTx: "push_transaction",
    sendTxList: "push_transactions",
    stats: "get_currency_stats",
    tableRows: "get_table_rows"
  },
  history: {
    actions: "get_actions",
    ctrlAccounts: "get_controlled_accounts",
    keyAccounts: "get_key_accounts",
    tx: "get_transaction"
  },
  net: {
    connect: "connect",
    connections: "connections",
    disconnect: "disconnect",
    status: "status"
  }
};

export const EOSModules = {
  DBSize: "DBSize",
  chain: "chain",
  history: "history",
  net: "net"
};
