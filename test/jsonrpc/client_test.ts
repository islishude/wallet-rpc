import test from "ava";
import http = require("http");
import { HttpClient, ReqData } from "../..";

test("test http client", async (t) => {
  const server = http.createServer(async (req, res) => {
    const chunk = [];
    for await (const tmp of req) {
      chunk.push(tmp);
    }

    res.writeHead(200, {
      "client-auth": req.headers.authorization || "empty",
      "client-method": req.method,
    });

    const data = JSON.parse(Buffer.concat(chunk).toString());

    if (data.id === "timeout") {
      setTimeout(() => {
        res.end("");
      }, 200);
      return;
    }

    res.end(
      JSON.stringify({
        id: data.id,
        result: data.params,
      }),
    );
  });

  const port = 8000;
  const host = "http://127.0.0.1:" + 8000;

  server.listen(port, () => {
    t.log("testing server start at", port);
  });

  {
    const client = new HttpClient({
      host,
      keepAlive: false,
      timeout: 3000,
    });

    {
      const reqData = new ReqData("id", "method");
      const { body, headers } = await client.Call(reqData.getData());
      t.deepEqual(body.result, []);
      t.deepEqual(undefined, body.error);
      t.deepEqual("empty", headers["client-auth"]);
      t.deepEqual("POST", headers["client-method"]);
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
      host,
      keepAlive: false,
      password,
      timeout: 3000,
      username,
    });

    const authText = Buffer.from(`${username}@${password}`).toString("base64");
    const reqData = new ReqData("id", "method", 1, true);
    const { headers } = await client.Call(reqData.getData());
    t.deepEqual("Basic " + authText, headers["client-auth"]);
  }

  {
    const client = new HttpClient({
      host,
      keepAlive: false,
      timeout: 20,
    });

    await t.throwsAsync(
      async () => {
        const reqData = new ReqData("timeout", "method", 1, true);
        await client.Call(reqData.getData());
      },
      { message: "timeout" },
    );
  }

  server.close(() => {
    t.log("server close errro");
  });
});
