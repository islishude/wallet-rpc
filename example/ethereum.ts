import {
  decodeAbiNumber,
  decodeAbiString,
  ERC20Client,
  GethClient,
  HttpClient,
  IClientConfig,
  IEthBlockSimple,
  IEthBlockVerbose,
  IMessage,
} from "wallet-rpc";

{
  // use default client: new HttpClient({ url: 'http://127.0.0.1:8545' })
  const EthClient = new GethClient();
  EthClient.client.setUrl("https://etherscan.io");
  EthClient.getChainId();
}

{
  const DefaultEthRpcConf: IClientConfig = {
    url: "http://127.0.0.1:8545",
    keepAlive: true,
    timeout: 10 * 1000,
  };

  const client = new HttpClient(DefaultEthRpcConf);
  const EthClient = new GethClient(client);

  (async () => {
    const txid =
      "0xc4f1806717dd22e89d158ae1466f9ebc0124d2169843a7bcc65975c8a8327854";

    // In production you should use Promise.all
    await EthClient.getTrx(txid);
    await EthClient.getTrxReceipt(txid);

    // include all transaction detail
    const blockVerbose: IMessage<IEthBlockVerbose> = await EthClient.getBlock(
      100,
      true,
    );
    // default and only txid returns
    const blockSimple: IMessage<IEthBlockSimple> = await EthClient.getBlock(
      1,
      false,
    );
    console.log(blockVerbose, blockSimple);
  })();

  (async () => {
    const address = "0x0";

    await EthClient.getBalance(address, "latest");
    await EthClient.getBalance(address, "pending");
    await EthClient.getBalance(address, 100);

    // Concurrency
    await Promise.all([
      EthClient.getBalance(address, "latest"),
      EthClient.getBalance(address, "pending"),
    ]);
  })();

  (async () => {
    const erc20 = new ERC20Client(EthClient);
    const address = "0x0";
    const token = "0x1";

    {
      // get latest balanceOf ERC20 token
      // Maybe throw
      const balance: bigint = await erc20.balanceOf(token, address);
      // or get pending
      // await erc20.balanceOf(token, address, "pending");
      console.log(balance);
    }

    // get name
    {
      const name: string = await erc20.name(token).catch(() => "Maybe throw");
      console.log(name);
    }

    {
      const symbol: string = await erc20
        .symbol(token)
        .catch(() => "Maybe throw");
      console.log(symbol);
    }

    // get decimals
    {
      const decimals: bigint = await erc20.decimals(token);
      console.log(decimals);
    }

    // get totalSupply
    {
      // Maybe throw
      const totalSupply: bigint = await erc20.totalSupply(token);
      console.log(totalSupply);
    }
  })();
}
