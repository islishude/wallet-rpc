import test from "ava";
import {
  IEthBlockSimple,
  IEthBlockVerbose,
  IEthTrx,
  IEthTrxReceipt,
} from "../..";

function doNothing(param: any): void {
  return param;
}

test("test IEthBlockSimple type", (t) => {
  const data: IEthBlockSimple = {
    difficulty: "0x1d95715bd14",
    extraData: "0x",
    gasLimit: "0x2fefd8",
    gasUsed: "0x5208",
    hash: "0x7eb7c23a5ac2f2d70aa1ba4e5c56d89de5ac993590e5f6e79c394e290d998ba8",
    logsBloom: "0x0",
    miner: "0xf927a40c8b7f6e07c5af7fa2155b4864a4112b13",
    mixHash:
      "0x13dd2c8aec729f75aebcd79a916ecb0f7edc6493efcc6a4da8d7b0ab3ee88444",
    nonce: "0xc60a782e2e69ce22",
    number: "0x10d4f",
    parentHash:
      "0xf8d01370e6e274f8188954fbee435b40c35b2ad3d4ab671f6d086cd559e48f04",
    receiptsRoot:
      "0x0c44b7ed0fefb613ec256341aa0ffdb643e869e3a0ebc8f58e36b4e47efedd33",
    sha3Uncles:
      "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
    size: "0x275",
    stateRoot:
      "0xd64a0f63e2c7f541e6e6f8548a10a5c4e49fda7ac1aa80f9dddef648c7b9e25f",
    timestamp: "0x55c9ea07",
    totalDifficulty: "0x120d56f6821b170",
    transactions: [
      "0x7eb7c23a5ac2f2d70aa1ba4e5c56d89de5ac993590e5f6e79c394e290d998ba8",
    ],
    transactionsRoot:
      "0x4a5b78c13d11559c9541576834b5172fe8b18507c0f9f76454fcdddedd8dff7a",
    uncles: ["0x0"],
  };
  doNothing(data);
  t.pass();
});

test("test IEthBlockVerbose type", (t) => {
  const data: IEthBlockVerbose = {
    difficulty: "0x1d95715bd14",
    extraData: "0x",
    gasLimit: "0x2fefd8",
    gasUsed: "0x5208",
    hash: "0x7eb7c23a5ac2f2d70aa1ba4e5c56d89de5ac993590e5f6e79c394e290d998ba8",
    logsBloom: "0x0",
    miner: "0xf927a40c8b7f6e07c5af7fa2155b4864a4112b13",
    mixHash:
      "0x13dd2c8aec729f75aebcd79a916ecb0f7edc6493efcc6a4da8d7b0ab3ee88444",
    nonce: "0xc60a782e2e69ce22",
    number: "0x10d4f",
    parentHash:
      "0xf8d01370e6e274f8188954fbee435b40c35b2ad3d4ab671f6d086cd559e48f04",
    receiptsRoot:
      "0x0c44b7ed0fefb613ec256341aa0ffdb643e869e3a0ebc8f58e36b4e47efedd33",
    sha3Uncles:
      "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
    size: "0x275",
    stateRoot:
      "0xd64a0f63e2c7f541e6e6f8548a10a5c4e49fda7ac1aa80f9dddef648c7b9e25f",
    timestamp: "0x55c9ea07",
    totalDifficulty: "0x120d56f6821b170",
    transactions: [
      {
        blockHash:
          "0x7eb7c23a5ac2f2d70aa1ba4e5c56d89de5ac993590e5f6e79c394e290d998ba8",
        blockNumber: "0x10d4f",
        from: "0x4458f86353b4740fe9e09071c23a7437640063c9",
        gas: "0x5208",
        gasPrice: "0xba43b7400",
        hash:
          "0xa442249820de6be754da81eafbd44a865773e4b23d7c0522d31fd03977823008",
        input: "0x",
        nonce: "0x1",
        to: "0xbf3403210f9802205f426759947a80a9fda71b1e",
        transactionIndex: "0x0",
        value: "0xaa9f075c200000",
        v: "0x1b",
        r: "0x2c2789c6704ba2606e200e1ba4fd17ba4f0e0f94abe32a12733708c3d3442616",
        s: "0x2946f47e3ece580b5b5ecb0f8c52604fa5f60aeb4103fc73adcbf6d620f9872b",
      },
    ],
    transactionsRoot:
      "0x4a5b78c13d11559c9541576834b5172fe8b18507c0f9f76454fcdddedd8dff7a",
    uncles: [],
  };

  doNothing(data);
  t.pass();
});

test("test IEthTrx type", (t) => {
  const data: IEthTrx = {
    blockHash:
      "0xf64a12502afc36db3d29931a2148e5d6ddaa883a2a3c968ca2fb293fa9258c68",
    blockNumber: "0x70839",
    from: "0xc80fb22930b303b55df9b89901889126400add38",
    gas: "0x30d40",
    gasPrice: "0xba43b7400",
    hash: "0x1e2910a262b1008d0616a0beb24c1a491d78771baa54a33e66065e03b1f46bc1",
    input: "",
    nonce: "0xa7",
    r: "0xe7ccdba116aa95ae8d9bdd02f619a0cdfc1f60c5740b3899865822a80cd70218",
    s: "0xf200df1921ea988d16280a0873b69cb782a54e8a596d15e700710c820c8d2a9e",
    to: "0x03fca6077d38dd99d0ce14ba32078bd2cda72d74",
    transactionIndex: "0x0",
    v: "0x1c",
    value: "0x0",
  };
  doNothing(data);
  t.pass();
});

test("test IEthTrxReceipt type", (t) => {
  const data: IEthTrxReceipt = {
    blockHash:
      "0xf64a12502afc36db3d29931a2148e5d6ddaa883a2a3c968ca2fb293fa9258c68",
    blockNumber: "0x70839",
    contractAddress: null,
    cumulativeGasUsed: "0x75d5",
    from: "0xc80fb22930b303b55df9b89901889126400add38",
    gasUsed: "0x75d5",
    logs: [
      {
        address: "0x03fca6077d38dd99d0ce14ba32078bd2cda72d74",
        topics: [
          "0x24bcf19562365f6510754002f8d7b818d275886315d29c7aa04785570b97a363",
        ],
        data: "0x0",
        blockNumber: "0x70839",
        transactionHash:
          "0x1e2910a262b1008d0616a0beb24c1a491d78771baa54a33e66065e03b1f46bc1",
        transactionIndex: "0x0",
        blockHash:
          "0xf64a12502afc36db3d29931a2148e5d6ddaa883a2a3c968ca2fb293fa9258c68",
        logIndex: "0x0",
        removed: false,
      },
    ],
    logsBloom: "0x0",
    root: "0xc659845f1ac4e899ff1b0666dbac5deeda33a4a5d85da71f617f352824146e40",
    to: "0x03fca6077d38dd99d0ce14ba32078bd2cda72d74",
    transactionHash:
      "0x1e2910a262b1008d0616a0beb24c1a491d78771baa54a33e66065e03b1f46bc1",
    transactionIndex: "0x0",
  };
  doNothing(data);
  t.pass();
});
