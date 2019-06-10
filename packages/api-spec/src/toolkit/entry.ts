export interface IEntryDescriptor {
  chunks: string[]
  asyncs?: string[]
}

// tslint:disable-next-line: no-namespace
export namespace IEntryDescriptor {
  export function convert(jsonObject: object) {
    throw new Error("No schema information")
  }
}
