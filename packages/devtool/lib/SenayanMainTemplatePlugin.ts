// tslint:disable: object-literal-sort-keys
// Source: https://github.com/webpack/webpack/tree/62d1b15/lib/webworker
import webpack from "webpack"

const Template = (webpack as any).Template

export default class SenayanMainTemplatePlugin {
  public apply(mainTemplate: any) {
    const needChunkOnDemandLoadingCode = (chunk: any) => {
      for (const chunkGroup of chunk.groupsIterable) {
        if (chunkGroup.getNumberOfChildren() > 0) {
          return true
        }
      }
      return false
    }
    mainTemplate.hooks.localVars.tap(
      "SenayanMainTemplatePlugin",
      (source: any, chunk: any) => {
        if (needChunkOnDemandLoadingCode(chunk)) {
          return Template.asString([
            source,
            "",
            "// object to store loaded chunks",
            '// "1" means "already loaded"',
            "var installedChunks = {",
            Template.indent(
              chunk.ids.map((id: any) => `${JSON.stringify(id)}: 1`).join(",\n")
            ),
            "};"
          ])
        }
        return source
      }
    )
    mainTemplate.hooks.requireEnsure.tap(
      "SenayanMainTemplatePlugin",
      (_: any, chunk: any, hash: any) => {
        const chunkFilename = mainTemplate.outputOptions.chunkFilename
        const chunkMaps = chunk.getChunkMaps()
        return Template.asString([
          '// "1" is the signal for "already loaded"',
          "if(!installedChunks[chunkId]) {",
          Template.indent([
            "promises.push(self.loadAll(" +
              mainTemplate.getAssetPath(JSON.stringify(chunkFilename), {
                hash: `" + ${mainTemplate.renderCurrentHashCode(hash)} + "`,
                hashWithLength: (length: any) =>
                  `" + ${mainTemplate.renderCurrentHashCode(hash, length)} + "`,
                chunk: {
                  id: '" + chunkId + "',
                  hash: `" + ${JSON.stringify(chunkMaps.hash)}[chunkId] + "`,
                  hashWithLength(length: any) {
                    const shortChunkHashMap = Object.create(null)
                    for (const chunkId of Object.keys(chunkMaps.hash)) {
                      if (typeof chunkMaps.hash[chunkId] === "string") {
                        shortChunkHashMap[chunkId] = chunkMaps.hash[
                          chunkId
                        ].substr(0, length)
                      }
                    }
                    return `" + ${JSON.stringify(
                      shortChunkHashMap
                    )}[chunkId] + "`
                  },
                  contentHash: {
                    javascript: `" + ${JSON.stringify(
                      chunkMaps.contentHash.javascript
                    )}[chunkId] + "`
                  },
                  contentHashWithLength: {
                    javascript: (length: any) => {
                      const shortContentHashMap: { [key: string]: any } = {}
                      const contentHash = chunkMaps.contentHash.javascript
                      for (const chunkId of Object.keys(contentHash)) {
                        if (typeof contentHash[chunkId] === "string") {
                          shortContentHashMap[chunkId] = contentHash[
                            chunkId
                          ].substr(0, length)
                        }
                      }
                      return `" + ${JSON.stringify(
                        shortContentHashMap
                      )}[chunkId] + "`
                    }
                  },
                  name: `" + (${JSON.stringify(
                    chunkMaps.name
                  )}[chunkId]||chunkId) + "`
                },
                contentHashType: "javascript"
              }) +
              "));"
          ]),
          "}"
        ])
      }
    )
    mainTemplate.hooks.bootstrap.tap(
      "SenayanMainTemplatePlugin",
      (source: any, chunk: any, hash: any) => {
        if (needChunkOnDemandLoadingCode(chunk)) {
          const chunkCallbackName = mainTemplate.outputOptions.chunkCallbackName
          const globalObject = mainTemplate.outputOptions.globalObject
          return Template.asString([
            source,
            `${globalObject}[${JSON.stringify(
              chunkCallbackName
            )}] = function webpackChunkCallback(chunkIds, moreModules) {`,
            Template.indent([
              "for(var moduleId in moreModules) {",
              Template.indent(
                mainTemplate.renderAddModule(
                  hash,
                  chunk,
                  "moduleId",
                  "moreModules[moduleId]"
                )
              ),
              "}",
              "while(chunkIds.length)",
              Template.indent("installedChunks[chunkIds.pop()] = 1;")
            ]),
            "};"
          ])
        }
        return source
      }
    )
    mainTemplate.hooks.hotBootstrap.tap(
      "SenayanMainTemplatePlugin",
      (source: any, _: any, hash: any) => {
        const hotUpdateChunkFilename =
          mainTemplate.outputOptions.hotUpdateChunkFilename
        const hotUpdateMainFilename =
          mainTemplate.outputOptions.hotUpdateMainFilename
        const hotUpdateFunction = mainTemplate.outputOptions.hotUpdateFunction
        const globalObject = mainTemplate.outputOptions.globalObject
        const currentHotUpdateChunkFilename = mainTemplate.getAssetPath(
          JSON.stringify(hotUpdateChunkFilename),
          {
            hash: `" + ${mainTemplate.renderCurrentHashCode(hash)} + "`,
            hashWithLength: (length: any) =>
              `" + ${mainTemplate.renderCurrentHashCode(hash, length)} + "`,
            chunk: {
              id: '" + chunkId + "'
            }
          }
        )
        const currentHotUpdateMainFilename = mainTemplate.getAssetPath(
          JSON.stringify(hotUpdateMainFilename),
          {
            hash: `" + ${mainTemplate.renderCurrentHashCode(hash)} + "`,
            hashWithLength: (length: any) =>
              `" + ${mainTemplate.renderCurrentHashCode(hash, length)} + "`
          }
        )

        return (
          source +
          "\n" +
          `var parentHotUpdateCallback = ${globalObject}[${JSON.stringify(
            hotUpdateFunction
          )}];\n` +
          `${globalObject}[${JSON.stringify(hotUpdateFunction)}] = ` +
          Template.getFunctionContent(require("./SenayanMainTemplate.runtime"))
            .replace(/\/\/\$semicolon/g, ";")
            .replace(/\$require\$/g, mainTemplate.requireFn)
            .replace(/\$hotMainFilename\$/g, currentHotUpdateMainFilename)
            .replace(/\$hotChunkFilename\$/g, currentHotUpdateChunkFilename)
            .replace(/\$hash\$/g, JSON.stringify(hash))
        )
      }
    )
    mainTemplate.hooks.hash.tap("SenayanMainTemplatePlugin", (hash: any) => {
      hash.update("webworker")
      hash.update("4")
    })
  }
}
