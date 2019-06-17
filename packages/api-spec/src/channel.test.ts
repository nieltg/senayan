import test from "ava"

import { Channel0 } from "./channel"

test("Channel0.SCHEMA_URL is exported as string", t => {
  t.assert(typeof Channel0.SCHEMA_URL === "string")
})
