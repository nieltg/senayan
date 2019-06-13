import { VerifierMap } from "../common"

// tslint:disable-next-line: interface-name
export interface Entry0 {
  chunks: string[]
  asyncs?: string[]
}

const verifiers: VerifierMap = {
  "https://nieltg.github.com/senayan/schemas/entry-0.json": (value: any) => {
    const chunks = value.chunks
    if (!Array.isArray(chunks) || chunks.length === 0) {
      return false
    }

    return true
  }
}

// tslint:disable-next-line: no-namespace
export namespace Entry0 {
  export function verify(jsonValue: any) {
    if (!jsonValue.$schema) {
      return false
    }

    const verifier = verifiers[jsonValue.$schema]
    if (!verifier) {
      return false
    }

    return verifier(jsonValue)
  }
}
