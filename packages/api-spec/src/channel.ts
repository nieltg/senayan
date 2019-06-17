// tslint:disable-next-line: interface-name
export interface Channel0 {
  mainChunkId: string
  entryConfigId: string

  baseUri: string
}

// tslint:disable-next-line: no-namespace
export namespace Channel0 {
  export const SCHEMA_URL =
    "https://nieltg.github.com/senayan/schemas/channel-0.json"

  export function stringify(value: Channel0) {
    return JSON.stringify({ ...value, $schema: SCHEMA_URL })
  }

  export function verify(jsonValue: any): jsonValue is Channel0 {
    if (jsonValue.$schema !== SCHEMA_URL) {
      return false
    }
    if (
      !jsonValue.baseUri ||
      !jsonValue.entryConfigId ||
      !jsonValue.mainChunkId
    ) {
      return false
    }

    return true
  }
}
