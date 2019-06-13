import test from "ava"

import { IEntryDescriptor } from "./entry"

test("IEntryDescriptor.convert rejects object with no schema", t => {
  t.throws(() => IEntryDescriptor.convert({}), "No schema information")
})

test("IEntryDescriptor.convert rejects object with unknown schema", t => {
  t.throws(
    () =>
      IEntryDescriptor.convert({
        $schema: "unknown"
      }),
    "Unknown schema"
  )
})

test("IEntryDescriptor.convert rejects wrong entry-0 object", t => {
  t.throws(
    () =>
      IEntryDescriptor.convert({
        $schema: "https://nieltg.github.com/senayan/schemas/entry-0.json"
      }),
    "Invalid payload"
  )
})

test("IEntryDescriptor.convert accepts minimal correct entry-0", t => {
  const value = {
    $schema: "https://nieltg.github.com/senayan/schemas/entry-0.json",
    chunks: ["chunk.js"]
  }
  t.deepEqual(IEntryDescriptor.convert(value), value)
})

test("IEntryDescriptor.convert rejects entry-0 with non-array chunks", t => {
  t.throws(
    () =>
      IEntryDescriptor.convert({
        $schema: "https://nieltg.github.com/senayan/schemas/entry-0.json",
        chunks: true
      }),
    "Invalid payload"
  )
})

test("IEntryDescriptor.convert rejects entry-0 with empty chunks", t => {
  t.throws(
    () =>
      IEntryDescriptor.convert({
        $schema: "https://nieltg.github.com/senayan/schemas/entry-0.json",
        chunks: []
      }),
    "Invalid payload"
  )
})
