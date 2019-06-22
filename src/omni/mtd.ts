/* spell-checker: disable */
export const OmniLayerMethods = {
  address: {
    allBalance: "omni_getallbalancesforaddress",
    balance: "omni_getbalance",
  },
  info: {
    client: "omni_getinfo",
  },
  property: {
    info: "omni_getproperty",
    list: "omni_listproperties",
  },
  tx: {
    detail: "omni_gettransaction",
    list: "omni_listblocktransactions",
    payload: "omni_getpayload",
    pending: "omni_listpendingtransactions",
    sendRaw: "omni_sendrawtx",
    wallet: "omni_listtransactions",
  },
};
