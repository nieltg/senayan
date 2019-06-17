import test from "ava"

import { Channel0 } from "./channel"

test("Channel0.SCHEMA_URL is exported as string", t => {
  t.assert(typeof Channel0.SCHEMA_URL === "string")
})

test("Channel0.verify rejects object with no schema", t => {
  t.false(Channel0.verify({}))
})

test("Channel0.verify accepts correct object", t => {
  t.true(
    Channel0.verify({
      $schema: "https://nieltg.github.com/senayan/schemas/channel-0.json",
      baseUri: "https://example.com",
      entryConfigId: "main.entry.json",
      mainChunkId: "main.js"
    })
  )
})
