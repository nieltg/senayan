import test from "ava"

import { IEntryDescriptor } from "./entry"

test("IEntryDescriptor.convert throws error for object with no schema", t => {
  t.throws(() => IEntryDescriptor.convert({}), "No schema information")
})
