import test from "ava";
import http = require("http");
import { HttpClient, IJsonRpcRequst, ReqData } from "../..";

test("test http client", async (t) => {
  const server = http.createServer(async (req, res) => {
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

  const port = 8000;
  const baseUrl = "http://127.0.0.1:8000";

  server.listen(port, () => {
    t.log("testing server start at", port);
  });

  {
    const client = new HttpClient({
      baseUrl,
      keepAlive: false,
      timeout: 3000,
    });

    {
      const reqData = new ReqData("id", "method");
      const { body } = await client.Call(reqData.getData());
      t.deepEqual(body.result, []);
      t.deepEqual(undefined, body.error);
    }
    {
      const reqData = new ReqData("id", "method", 1, true);
      const { body } = await client.Call(reqData.getData());
      t.deepEqual(undefined, body.error);
      t.deepEqual(body.result, [1, true], "param is [1, true]");
    }
  }

  {
    const password = "test";
    const username = "test";
    const client = new HttpClient({
      baseUrl,
      keepAlive: false,
      password,
      timeout: 3000,
      username,
    });

    // test client config
    t.deepEqual(client.options.auth, `${username}@${password}`);
    t.deepEqual(client.options.timeout, 3000);
    t.deepEqual(client.options.method, "POST");

    const method = client.options.headers;
    // @ts-ignore
    t.deepEqual(method.Accept, "application/json");
    // @ts-ignore
    t.deepEqual(method["Content-Type"], "application/json");
    // @ts-ignore
    t.deepEqual(method["Accept-Encoding"], "identity");
  }

  {
    // test default client config
    const client = new HttpClient({
      baseUrl,
    });

    t.deepEqual(client.options.auth, undefined);
    t.deepEqual(client.options.timeout, 60000);
    t.deepEqual(client.options.method, "POST");
  }

  {
    const client = new HttpClient({
      baseUrl,
      keepAlive: false,
      timeout: 20,
    });

    (async () => {
      let hasError = false;
      try {
        const reqData = new ReqData("timeout", "method", 1, true);
        await client.Call(reqData.getData());
      } catch (e) {
        hasError = true;
      }
      t.deepEqual(hasError, true);
    })();
  }

  server.close(() => {
    t.log("server close errro");
  });
});
