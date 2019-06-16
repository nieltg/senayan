// Source: https://github.com/webpack/webpack/tree/62d1b15/lib

export default class LoaderTargetPlugin {
  constructor(public target: string) {}

  public apply(compiler: any) {
    compiler.hooks.compilation.tap("LoaderTargetPlugin", (compilation: any) => {
      compilation.hooks.normalModuleLoader.tap(
        "LoaderTargetPlugin",
        (loaderContext: any) => {
          loaderContext.target = this.target
        }
      )
    })
  }
}
