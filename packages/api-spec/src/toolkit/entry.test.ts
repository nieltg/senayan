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

test("IEntryDescriptor.convert rejects wrong entry-1 object", t => {
  t.throws(
    () =>
      IEntryDescriptor.convert({
        $schema: "https://nieltg.github.com/senayan/schemas/entry-v1.json"
      }),
    "Invalid payload"
  )
})

test("IEntryDescriptor.convert accepts minimal correct entry-1", t => {
  const value = {
    $schema: "https://nieltg.github.com/senayan/schemas/entry-v1.json",
    chunks: ["chunk.js"]
  }
  t.deepEqual(IEntryDescriptor.convert(value), value)
})

test("IEntryDescriptor.convert rejects entry-1 with non-array chunks", t => {
  t.throws(
    () =>
      IEntryDescriptor.convert({
        $schema: "https://nieltg.github.com/senayan/schemas/entry-v1.json",
        chunks: true
      }),
    "Invalid payload"
  )
})

test("IEntryDescriptor.convert rejects entry-1 with empty chunks", t => {
  t.throws(
    () =>
      IEntryDescriptor.convert({
        $schema: "https://nieltg.github.com/senayan/schemas/entry-v1.json",
        chunks: []
      }),
    "Invalid payload"
  )
})
