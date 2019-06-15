// tslint:disable-next-line: interface-name
export interface Entry0 {
  chunks: string[]
  asyncs?: string[]
}

// tslint:disable-next-line: no-namespace
export namespace Entry0 {
  export const SCHEMA_URL =
    "https://nieltg.github.com/senayan/schemas/entry-0.json"

  export function stringify(value: Entry0) {
    return JSON.stringify({ ...value, $schema: SCHEMA_URL })
  }

  export function verify(jsonValue: any) {
    if (jsonValue.$schema !== SCHEMA_URL) {
      return false
    }

    const chunks = jsonValue.chunks
    if (!Array.isArray(chunks) || chunks.length === 0) {
      return false
    }

    return true
  }
}
