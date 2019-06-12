import test from "ava"

import { IEntryDescriptor } from "./entry"

test("IEntryDescriptor.convert throws error for object with no schema", t => {
  t.throws(() => IEntryDescriptor.convert({}), "No schema information")
})

test("IEntryDescriptor.convert throws error for object with unknown schema", t => {
  t.throws(
    () =>
      IEntryDescriptor.convert({
        $schema: "unknown"
      }),
    "Unknown schema"
  )
})

test("IEntryDescriptor.convert throws error for wrong object with schema", t => {
  t.throws(
    () =>
      IEntryDescriptor.convert({
        $schema: "https://nieltg.github.com/senayan/schemas/entry-v1.json"
      }),
    "Invalid payload"
  )
})
