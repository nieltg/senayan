#!/usr/bin/env node
import { scriptName } from "yargs"

import { build } from "@senayan/devtool"

// tslint:disable-next-line: no-unused-expression
scriptName("senayan")
  .usage("$0 <cmd> [args]")
  .command(
    "build",
    "Build the project for Senayan infrastructure",
    yargs => yargs,
    argv => {
      build({}).then(
        // tslint:disable-next-line: no-console
        stats => console.log(stats.toString()),
        // tslint:disable-next-line: no-console
        reason => console.log(reason)
      )
    }
  )
  .help().argv
