export interface IEntryDescriptor {
  chunks: string[]
  asyncs?: string[]
}

// tslint:disable-next-line: no-namespace
export namespace IEntryDescriptor {
  export function convert(jsonObject: any) {
    if (!jsonObject.$schema) {
      throw new Error("No schema information")
    }

    throw new Error("Unknown schema")
  }
}
