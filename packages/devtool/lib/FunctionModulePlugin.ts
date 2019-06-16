// Source: https://github.com/webpack/webpack/tree/62d1b15/lib
import FunctionModuleTemplatePlugin from "./FunctionModuleTemplatePlugin"

export default class FunctionModulePlugin {
  public apply(compiler: any) {
    compiler.hooks.compilation.tap(
      "FunctionModulePlugin",
      (compilation: any) => {
        new FunctionModuleTemplatePlugin().apply(
          compilation.moduleTemplates.javascript
        )
      }
    )
  }
}
