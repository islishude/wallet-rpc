import test from "ava";
import http = require("http");
import https = require("https");
import { HttpClient, IJsonRpcRequst, ReqData } from "../..";

let server: http.Server;

const port = 8000;
const baseUrl = "http://127.0.0.1:8000";

test.before((t) => {
  server = http.createServer(async (req, res) => {
    const chunk: Buffer[] = [];

    req.on("data", (tmp) => {
      chunk.push(tmp);
    });

    req.on("end", () => {
      res.writeHead(200);

      // parse req data
      const data: IJsonRpcRequst = JSON.parse(Buffer.concat(chunk).toString());

      if (data.id === "timeout") {
        setTimeout(() => {
          const ret = JSON.stringify({
            id: 100,
            error: { message: "timeout", code: 400 },
          });
          res.end(ret);
        }, 200);
        return;
      }

      // successful returns
      {
        const ret = JSON.stringify({
          id: data.id,
          result: data.params,
        });
        res.end(ret);
      }
    });
  });

  server.listen(port, () => {
    t.log("testing server start at", port);
  });
});

test.after((t) => {
  server.close(() => {
    t.log("server close error");
  });
});

test("test response and no error", async (t) => {
  const client = new HttpClient({
    url: baseUrl,
    keepAlive: false,
    timeout: 3000,
  });

  const reqData = new ReqData("id", "method");
  const { body } = await client.Call(reqData.getData());
  t.deepEqual(body.result, []);
  t.deepEqual(undefined, body.error);
});

test("test another response and no error", async (t) => {
  const client = new HttpClient({
    url: baseUrl,
    keepAlive: false,
    timeout: 3000,
  });

  const reqData = new ReqData("id", "method", 1, true);
  const { body } = await client.Call(reqData.getData());
  t.deepEqual(undefined, body.error);
  t.deepEqual(body.result, [1, true], "param is [1, true]");
});

test("test http client config", async (t) => {
  const password = "test";
  const username = "test";
  const client = new HttpClient({
    url: baseUrl,
    keepAlive: false,
    password,
    timeout: 3000,
    username,
  });

  // test client config
  t.deepEqual(client.options.auth, `${username}@${password}`);
  t.deepEqual(client.options.timeout, 3000);
  t.deepEqual(client.options.method, "POST");

  t.assert(client.httpModule.globalAgent === http.globalAgent);

  const method = client.options.headers;
  // @ts-ignore
  t.deepEqual(method.Accept, "application/json");
  // @ts-ignore
  t.deepEqual(method["Content-Type"], "application/json");
  // @ts-ignore
  t.deepEqual(method["Accept-Encoding"], "identity");
});

test("test default client config", async (t) => {
  const client = new HttpClient({
    url: baseUrl,
  });

  t.deepEqual(client.options.auth, undefined);
  t.deepEqual(client.options.timeout, 60000);
  t.deepEqual(client.options.method, "POST");
});

test("test set auth", (t) => {
  const testData = [
    {
      args: {
        username: "",
        password: "",
      },
      want: undefined,
    },
    {
      args: {
        username: "username",
        password: "",
      },
      want: undefined,
    },
    {
      args: {
        username: "",
        password: "password",
      },
      want: undefined,
    },
    {
      args: {
        username: "username",
        password: "password",
      },
      want: "username@password",
    },
  ];

  const client = new HttpClient({ url: "" });

  for (const {
    args: { username, password },
    want,
  } of testData) {
    client.setAuth(username, password);
    t.deepEqual(client.options.auth, want);
  }
});

test("test set url", (t) => {
  const github = "https://github.com";
  const client = new HttpClient({ url: github });
  t.assert(client.httpModule.globalAgent === https.globalAgent);
  t.deepEqual(client.url, github);
  t.deepEqual(client.options.port, undefined);

  const unsafe = "http://unsafe.com";
  client.setUrl(unsafe);
  t.deepEqual(client.url, unsafe);
  t.deepEqual(client.options.port, undefined);
  t.assert(client.httpModule.globalAgent === http.globalAgent);

  const geth = "http://127.0.0.1:8545";
  client.setUrl(geth);
  t.deepEqual(client.url, geth);
  t.deepEqual(client.options.port, 8545);
  t.assert(client.httpModule.globalAgent === http.globalAgent);
});

test("test timeout", async (t) => {
  const client = new HttpClient({
    url: baseUrl,
    keepAlive: false,
    timeout: 1,
  });

  let hasError = false;
  try {
    const reqData = new ReqData("timeout", "method", 1, true);
    await client.Call(reqData.getData());
  } catch (e) {
    t.deepEqual(e.message, "timeout");
    hasError = true;
  }
  t.deepEqual(hasError, true);
});
