import test from "ava"

import { Entry0 } from "./entry"

test("Entry0.convert rejects object with no schema", t => {
  t.throws(() => Entry0.convert({}), "No schema information")
})

test("Entry0.convert rejects object with unknown schema", t => {
  t.throws(
    () =>
      Entry0.convert({
        $schema: "unknown"
      }),
    "Unknown schema"
  )
})

test("Entry0.convert rejects wrong entry-0 object", t => {
  t.throws(
    () =>
      Entry0.convert({
        $schema: "https://nieltg.github.com/senayan/schemas/entry-0.json"
      }),
    "Invalid payload"
  )
})

test("Entry0.convert accepts minimal correct entry-0", t => {
  const value = {
    $schema: "https://nieltg.github.com/senayan/schemas/entry-0.json",
    chunks: ["chunk.js"]
  }
  t.deepEqual(Entry0.convert(value), value)
})

test("Entry0.convert rejects entry-0 with non-array chunks", t => {
  t.throws(
    () =>
      Entry0.convert({
        $schema: "https://nieltg.github.com/senayan/schemas/entry-0.json",
        chunks: true
      }),
    "Invalid payload"
  )
})

test("Entry0.convert rejects entry-0 with empty chunks", t => {
  t.throws(
    () =>
      Entry0.convert({
        $schema: "https://nieltg.github.com/senayan/schemas/entry-0.json",
        chunks: []
      }),
    "Invalid payload"
  )
})
