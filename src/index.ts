export { BitcoinMethods } from "./bitcoin/mtd";
export { BitcoinClient } from "./bitcoin/rpc";
export { EthereumMethods } from "./ethereum/mtd";
export { EthereumClient } from "./ethereum/rpc";
export { EthereumUtil } from "./ethereum/util";
export { OmniLayerMethods } from "./omni/mtd";
export { OmniLayerClient } from "./omni/rpc";
export { EOSClient } from "./eos/rpc";

export {
  IEosAccount,
  IEosAuthority,
  IEosBlockInfo,
  IEosChainInfo,
  IEosTrx,
  IEosAbi,
  IEosError,
} from "./eos/type";

export { IRpcRequest, IRpcErrorStruct, IRpcResponse, IRpcConfig } from "./type";

export {
  IEthAbiCommonStruct,
  IEthAbiInputStruct,
  IEthAbiOutputStruct,
  IEthAbiStruct,
  IEthBlock,
  IEthBlockSimple,
  IEthBlockVerbose,
  IEthCallFuncParam,
  IEtherScanAbiResponse,
  IEthReceiptLogs,
  IEthSentTxStruct,
  IEthStatus,
  IEthSyncing,
  IEthTraceTxReturn,
  IEthTx,
  IEthTxPoolContent,
  IEthTxReceipt,
  IParityCallAction,
  IParityCallResult,
  IParityCreateAction,
  IParityCreateResult,
  IParitySuicideAction,
  IParityTxTrace,
} from "./ethereum/type";

export { IOmniClientInfo, IOmniTxInfo } from "./omni/type";

export {
  IBtcBlockchainInfo,
  IBtcBlockInfo,
  IBtcFee,
  IBtcMemoryInfo,
  IBtcNetworkInfo,
  IBtcTxInfo,
  IBtcVerboseMemPool,
  IBtcWalletInfo,
  IBtcTxVin,
  IBtcTxVout,
} from "./bitcoin/type";
