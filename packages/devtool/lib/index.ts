import { Compiler } from "webpack"

import FunctionModulePlugin from "./FunctionModulePlugin"
import LoaderTargetPlugin from "./LoaderTargetPlugin"
import SenayanTemplatePlugin from "./SenayanTemplatePlugin"

export function buildTarget(compiler: Compiler) {
  new SenayanTemplatePlugin().apply(compiler)
  new FunctionModulePlugin().apply(compiler)
  new LoaderTargetPlugin("webworker").apply(compiler)
}
