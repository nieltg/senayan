import anyTest, { TestInterface } from "ava"

import { parse } from "acorn"
import { readFile } from "fs"
import path from "path"
import webpack, { Stats } from "webpack"

import { buildTarget } from "../lib/index"

const test = anyTest as TestInterface<Stats.ToJsonOutput>

const webpackOutdir = path.resolve(__dirname, `${__filename}-webpack-out`)

test.before("Webpack compilation is successful", t => {
  return new Promise((resolve, reject) => {
    const compiler = webpack({
      // Webpack config.
      mode: "production",
      output: {
        path: webpackOutdir
      },
      target: buildTarget,

      entry: {
        a: "./tests/fixtures/multi-entry/a.js",
        b: "./tests/fixtures/multi-entry/b.js"
      },
      optimization: {
        minimize: false
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

test("Webpack emit valid JavaScript files", async t => {
  for (const name of extractAssetNames(t.context)) {
    if (!name.endsWith(".js")) {
      continue
    }

    const content = await new Promise<string>((resolve, reject) => {
      readFile(path.resolve(webpackOutdir, name), (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data.toString())
        }
      })
    })
    parse(content)
  }
  t.pass()
})
