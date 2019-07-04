import { BitcoinClient, HttpClient, IClientConfig } from "wallet-rpc";

{
  // Use default client: new HttpClient({ url: 'http://127.0.0.1:8332' })
  const BtcClient = new BitcoinClient();
  BtcClient.client.setAuth("username", "password");
  BtcClient.client.setUrl("http://192.168.0.100:108332");

  (async () => {
    await BtcClient.getBlockCount();

    await BtcClient.getBlockchainInfo();
  })();
}

{
  // self defined http client
  const DefaultBtcRpcConf: IClientConfig = {
    url: "http://127.0.0.1:8832",
    keepAlive: false,
    password: "your-rpc-passwword",
    timeout: 10 * 1000,
    username: "your-rpc-username",
  };

  const client = new HttpClient(DefaultBtcRpcConf);
  const BtcClient = new BitcoinClient(client);

  // Simple Example
  (async () => {
    const txid =
      "0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098";
    const { body, statusCode, headers } = await BtcClient.getRawTrx(txid, true);
    console.log(statusCode, headers);
    const { result, error, id } = body;
    if (error !== undefined) {
      // ...
    }
    console.log(id);
    return result;
  })();
}
