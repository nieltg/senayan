import test from "ava"

import { Entry0 } from "./entry"

test("Entry0.SCHEMA_URL is exported as string", t => {
  t.assert(typeof Entry0.SCHEMA_URL === "string")
})

test("Entry0.verify rejects object with no schema", t => {
  t.false(Entry0.verify({}))
})

test("Entry0.verify rejects object with wrong schema", t => {
  t.false(
    Entry0.verify({
      $schema: "unknown"
    })
  )
})

test("Entry0.verify rejects wrong object", t => {
  t.false(
    Entry0.verify({
      $schema: "https://nieltg.github.com/senayan/schemas/entry-0.json"
    })
  )
})

test("Entry0.verify accepts minimal correct object", t => {
  t.true(
    Entry0.verify({
      $schema: "https://nieltg.github.com/senayan/schemas/entry-0.json",
      chunks: ["chunk.js"]
    })
  )
})

test("Entry0.verify rejects object with non-array chunks", t => {
  t.false(
    Entry0.verify({
      $schema: "https://nieltg.github.com/senayan/schemas/entry-0.json",
      chunks: true
    })
  )
})

test("Entry0.verify rejects object with empty chunks", t => {
  t.false(
    Entry0.verify({
      $schema: "https://nieltg.github.com/senayan/schemas/entry-0.json",
      chunks: []
    })
  )
})
