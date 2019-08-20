import test from "ava";
import { ReqData } from "../../dist/jsonrpc/reqdata";

test("test ReqData constructor", (t) => {
  {
    const data = new ReqData("id", "method");
    t.deepEqual(data.params, []);
  }

  {
    const data = new ReqData("id", "method", 1, 2, undefined, null, {});
    t.deepEqual(data.params, [1, 2, null, {}]);
  }

  {
    const data = new ReqData("id", "method", 1, true, "data");
    t.deepEqual(data.params, [1, true, "data"]);
  }
});

test("test ReqData getData()", (t) => {
  {
    const data = new ReqData("id", "method");
    const bytes = Buffer.from(
      JSON.stringify({ id: "id", jsonrpc: "2.0", method: "method", params: [] }),
    ).toString("hex");

    t.deepEqual(data.getData().toString("hex"), bytes);
  }

  {
    const data = new ReqData("id", "method", 1, 2, null);
    const bytes = Buffer.from(
      JSON.stringify({
        id: "id",
        jsonrpc: "2.0",
        method: "method",
        params: [1, 2, null],
      }),
    ).toString("hex");

    t.deepEqual(data.getData().toString("hex"), bytes);
  }
});
