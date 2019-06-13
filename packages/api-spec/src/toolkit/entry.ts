import { VerifierMap } from "../common"

// tslint:disable-next-line: interface-name
export interface Entry0 {
  chunks: string[]
  asyncs?: string[]
}

// tslint:disable-next-line: no-namespace
export namespace Entry0 {
  export function verify(jsonValue: any) {
    if (
      jsonValue.$schema !==
      "https://nieltg.github.com/senayan/schemas/entry-0.json"
    ) {
      return false
    }

    const chunks = jsonValue.chunks
    if (!Array.isArray(chunks) || chunks.length === 0) {
      return false
    }

    return true
  }
}
