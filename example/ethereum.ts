import { log } from "console";
import { EthereumClient, IRpcConfig } from "wallet-rpc";

const DefaultEthRpcConf: IRpcConfig = {
  ip: "http://127.0.0.1",
  pass: "",
  port: "8545",
  user: ""
};

const EthClient = new EthereumClient(DefaultEthRpcConf);

export const example0 = async () => {
  const txid =
    "0xc4f1806717dd22e89d158ae1466f9ebc0124d2169843a7bcc65975c8a8327854";

  // In production you should use Promise.all
  const { result: txInfo } = await EthClient.getTxByHash(txid);
  const { result: txReceipt } = await EthClient.getTxReceipt(txid);
  // If you connect the parity
  const { result: txTrance } = await EthClient.traceTxByParity(txid);

  log(txInfo, txReceipt, txTrance);
};

export const example1 = async () => {
  const address = "0x0";

  const { result: latest } = await EthClient.getBalance(address, "latest");
  const { result: pending } = await EthClient.getBalance(address, "pending");
  log(latest, pending);

  // Concurrency
  await Promise.all([
    EthClient.getBalance(address, "latest"),
    EthClient.getBalance(address, "pending")
  ]);
};

export const example2 = async () => {
  const address = "0x0";
  const token = "0x1";
  const latest = await EthClient.ERC20Balance(token, address, false);
  const pending = await EthClient.ERC20Balance(token, address, true);
  log(latest, pending);

  const TRX = "0xf230b790e05390fc8295f4d3f60332c93bed42e2";
  const TokenInfo = await EthClient.ERC20TokenInfo(TRX);
  const { decimals, name, totalSupply, symbol } = TokenInfo;
  log(decimals, name, totalSupply, symbol);
};

export const example3 = async () => {
  const address = "0x0";
  const nonce = await EthClient.getAddrNonce(address);
  // If you connect the parity
  const pendingNonce = await EthClient.getAddrNextNonce(address);
  log(nonce, pendingNonce);
};
