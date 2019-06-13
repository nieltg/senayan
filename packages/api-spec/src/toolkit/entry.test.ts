import test from "ava"

import { Entry0 } from "./entry"

test("Entry0.verify rejects object with no schema", t => {
  t.false(Entry0.verify({}))
})

test("Entry0.verify rejects object with unknown schema", t => {
  t.false(
    Entry0.verify({
      $schema: "unknown"
    })
  )
})

test("Entry0.verify rejects wrong entry-0 object", t => {
  t.false(
    Entry0.verify({
      $schema: "https://nieltg.github.com/senayan/schemas/entry-0.json"
    })
  )
})

test("Entry0.verify accepts minimal correct entry-0", t => {
  t.true(
    Entry0.verify({
      $schema: "https://nieltg.github.com/senayan/schemas/entry-0.json",
      chunks: ["chunk.js"]
    })
  )
})

test("Entry0.verify rejects entry-0 with non-array chunks", t => {
  t.false(
    Entry0.verify({
      $schema: "https://nieltg.github.com/senayan/schemas/entry-0.json",
      chunks: true
    })
  )
})

test("Entry0.verify rejects entry-0 with empty chunks", t => {
  t.false(
    Entry0.verify({
      $schema: "https://nieltg.github.com/senayan/schemas/entry-0.json",
      chunks: []
    })
  )
})
