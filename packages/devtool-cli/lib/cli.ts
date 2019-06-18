#!/usr/bin/env node
import cosmiconfig from "cosmiconfig"
import { scriptName } from "yargs"

import { build } from "@senayan/devtool"

// tslint:disable-next-line: no-unused-expression
scriptName("senayan")
  .usage("$0 <cmd> [args]")
  .command(
    "build",
    "Build the project for Senayan infrastructure",
    yargs => yargs,
    // tslint:disable-next-line: variable-name
    async _argv => {
      const result = await cosmiconfig("senayan").search()
      if (result) {
        const stats = await build(result.config.webpack)
        // tslint:disable-next-line: no-console
        console.log(stats.toString())
      }
    }
  )
  .help().argv
