import { assert } from "console";
import { sha3 } from "../src/ethereum/util";

assert(
  sha3("test") ===
    "9c22ff5f21f0b81b113e63f7db6da94fedef11b2119b4088b89664fb9a3cb658"
);
