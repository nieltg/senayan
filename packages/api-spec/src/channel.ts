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

  export function verify(jsonValue: any) {
    return Object.keys(jsonValue).length > 0
  }
}