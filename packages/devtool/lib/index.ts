import webpack, { Compiler, Configuration, Stats } from "webpack"

import ExtractEntryPlugin from "./ExtractEntryPlugin"
import FunctionModulePlugin from "./FunctionModulePlugin"
import LoaderTargetPlugin from "./LoaderTargetPlugin"
import SenayanTemplatePlugin from "./SenayanTemplatePlugin"

export function buildTarget(compiler: Compiler) {
  new SenayanTemplatePlugin().apply(compiler)
  new FunctionModulePlugin().apply(compiler)
  new LoaderTargetPlugin("webworker").apply(compiler)
}

export async function build(webpackConfig: Configuration) {
  const compiler = webpack({
    ...webpackConfig,
    plugins: [...webpackConfig.plugins, new ExtractEntryPlugin()],
    target: buildTarget
  })

  return await new Promise<Stats>((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        reject(err)
      } else {
        resolve(stats)
      }
    })
  })
}
