import webpack, {
  compilation as WebpackCompilation,
  Compiler,
  Plugin
} from "webpack"
import { RawSource } from "webpack-sources"

import { Entry0 } from "@senayan/api-spec"

interface IEntryPoint {
  chunks: WebpackCompilation.Chunk[]
}

function findAsyncChunks(chunks: Iterable<WebpackCompilation.Chunk>) {
  const asyncChunks = new Set<WebpackCompilation.Chunk>()
  for (const chunk of chunks) {
    chunk.getAllAsyncChunks().forEach(asyncChunk => asyncChunks.add(asyncChunk))
  }

  return asyncChunks
}

function chunkNames(chunks: Iterable<WebpackCompilation.Chunk>) {
  const files: string[] = []
  for (const chunk of chunks) {
    files.push(...chunk.files)
  }

  return files
}

const undefinedIfEmpty = <T>(arr: T[]) => (arr.length > 0 ? arr : undefined)

function buildContent(entry: IEntryPoint) {
  return Entry0.stringify({
    asyncs: undefinedIfEmpty(chunkNames(findAsyncChunks(entry.chunks))),
    chunks: chunkNames(entry.chunks)
  })
}

export default class ExtractEntryPlugin implements Plugin {
  public apply(compiler: Compiler) {
    compiler.hooks.emit.tap("SenayanPlugin", compilation => {
      for (const [entryName, entry] of compilation.entrypoints.entries()) {
        compilation.assets[entryName + ".entry.json"] = new RawSource(
          buildContent(entry)
        )
      }
    })
  }

  // TODO: Get prefetched chunks.
  // chunk.getChildIdsByOrdersMap(true).prefetch
}
