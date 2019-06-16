import anyTest, { TestInterface } from "ava"

import path from "path"
import webpack, { Stats } from "webpack"

import ExtractEntryPlugin from "../lib/ExtractEntryPlugin"

const test = anyTest as TestInterface<Stats.ToJsonOutput>

test.before("Webpack compilation is successful", t => {
  return new Promise((resolve, reject) => {
    const compiler = webpack({
      // Webpack config.
      mode: "production",
      output: {
        path: path.resolve(__dirname, `${__filename}-webpack-out`)
      },
      plugins: [new ExtractEntryPlugin()],

      entry: {
        a: "./tests/fixtures/multi-entry/a.js",
        b: "./tests/fixtures/multi-entry/b.js"
      }
    })

    compiler.run((err, stats) => {
      if (err) {
        reject(err)
      } else if (stats.hasErrors()) {
        reject(stats.toString())
      }

      t.context = stats.toJson()
      resolve()
    })
  })
})

interface IAsset {
  name: string
}

function extractAssetNames(stats: Stats.ToJsonOutput) {
  return (stats.assets as IAsset[]).map(asset => asset.name)
}

test("Entry descriptors are emitted", t => {
  const files = extractAssetNames(t.context)
  t.true(files.includes("a.entry.json") && files.includes("b.entry.json"))
})

test("Non-entry descriptors aren't emitted", t => {
  const files = extractAssetNames(t.context)
  t.false(files.includes("c.entry.json"))
})
