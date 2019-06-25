export { decodeAbiNumber, decodeAbiString, ERC20Client } from "./eth/erc20";
export { GethClient } from "./eth/geth";
export { ParityClient } from "./eth/parity";
export {
  IEthBlock,
  IEthBlockSimple,
  IEthBlockVerbose,
  IEthCallFuncParam,
  IEthTrx,
  IEthTrxReceipt,
  IEthTrxReceiptLog,
  IEthTxPoolContent,
  IEthTxPoolInspect,
  IEthTxPoolStatus,
  IParityCallAction,
  IParityCallResult,
  IParityCreateAction,
  IParityCreateResult,
  IParitySuicideAction,
  IParityTrxTrace,
  ISyncingStatus,
} from "./eth/types";

export { BitcoinClient } from "./btc/client";
export {
  IBtcBlockInfo,
  IBtcBlockchainInfo,
  IBtcFee,
  IBtcMemPoolInfo,
  IBtcMemoryInfo,
  IBtcNetworkInfo,
  IBtcTrxOut,
  IBtcTxInfo,
  IBtcTxVin,
  IBtcTxVout,
  IBtcVerboseMemPool,
  IBtcWalletInfo,
} from "./btc/type";

export {
  IOmniClientInfo,
  IOmniPropertyBalance,
  IOmniPropertyInfo,
  IOmniTxInfo,
} from "./omni/type";
export { OmniClient } from "./omni/client";

export { HttpClient } from "./jsonrpc/client";
export {
  IJsonRpcRequst,
  IJsonRpcResponse,
  IMessage,
  IClientConfig,
} from "./jsonrpc/imsg";
export { ReqData } from "./jsonrpc/reqdata";
export { IJsonRpcClient } from "./jsonrpc/ijsonrpc";
