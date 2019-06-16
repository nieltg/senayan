// Source: https://github.com/webpack/webpack/tree/62d1b15/lib/webworker
import SenayanChunkTemplatePlugin from "./SenayanChunkTemplatePlugin"
import SenayanMainTemplatePlugin from "./SenayanMainTemplatePlugin"

export default class SenayanTemplatePlugin {
  public apply(compiler: any) {
    compiler.hooks.thisCompilation.tap(
      "SenayanTemplatePlugin",
      (compilation: any) => {
        new SenayanMainTemplatePlugin().apply(compilation.mainTemplate)
        new SenayanChunkTemplatePlugin().apply(compilation.chunkTemplate)
      }
    )
  }
}
