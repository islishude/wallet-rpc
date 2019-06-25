import { ERC20Client, GethClient, HttpClient, IClientConfig } from "wallet-rpc";

const DefaultEthRpcConf: IClientConfig = {
  url: "http://127.0.0.1:8545",
  keepAlive: true,
  timeout: 10 * 1000,
};

const client = new HttpClient(DefaultEthRpcConf);
const EthClient = new GethClient(client);

export const example0 = async () => {
  const txid =
    "0xc4f1806717dd22e89d158ae1466f9ebc0124d2169843a7bcc65975c8a8327854";

  // In production you should use Promise.all
  await EthClient.getTrx(txid);
  await EthClient.getTrxReceipt(txid);
};

export const example1 = async () => {
  const address = "0x0";

  await EthClient.getBalance(address, "latest");
  await EthClient.getBalance(address, "pending");
  await EthClient.getBalance(address, 100);

  // Concurrency
  await Promise.all([
    EthClient.getBalance(address, "latest"),
    EthClient.getBalance(address, "pending"),
  ]);
};

export const example2 = async () => {
  const erc20Client = new ERC20Client(EthClient);
  const address = "0x0";
  const token = "0x1";
  await erc20Client.balanceOf(token, address, 1);
  await erc20Client.balanceOf(token, address, "pending");
};
