// Source: https://github.com/webpack/webpack/tree/62d1b15/lib/webworker
import { ConcatSource } from "webpack-sources"

export default class SenayanChunkTemplatePlugin {
  public apply(chunkTemplate: any) {
    chunkTemplate.hooks.render.tap(
      "SenayanChunkTemplatePlugin",
      (modules: any, chunk: any) => {
        const chunkCallbackName = chunkTemplate.outputOptions.chunkCallbackName
        const globalObject = chunkTemplate.outputOptions.globalObject
        const source = new ConcatSource()
        source.add(
          `${globalObject}[${JSON.stringify(
            chunkCallbackName
          )}](${JSON.stringify(chunk.ids)},`
        )
        source.add(modules)
        source.add(")")
        return source
      }
    )
    chunkTemplate.hooks.hash.tap("SenayanChunkTemplatePlugin", (hash: any) => {
      hash.update("webworker")
      hash.update("3")
      hash.update(`${chunkTemplate.outputOptions.chunkCallbackName}`)
      hash.update(`${chunkTemplate.outputOptions.globalObject}`)
    })
  }
}
