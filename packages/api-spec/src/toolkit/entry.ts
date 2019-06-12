export interface IEntryDescriptor {
  chunks: string[]
  asyncs?: string[]
}

// tslint:disable-next-line: no-namespace
export namespace IEntryDescriptor {
  function convertEntry1(value: any): IEntryDescriptor {
    const chunks = value.chunks
    if (!Array.isArray(chunks) || chunks.length === 0) {
      throw new Error("Invalid payload")
    }

    return value
  }

  export function convert(jsonValue: any) {
    if (!jsonValue.$schema) {
      throw new Error("No schema information")
    }

    switch (jsonValue.$schema) {
      case "https://nieltg.github.com/senayan/schemas/entry-v1.json":
        return convertEntry1(jsonValue)

      default:
        throw new Error("Unknown schema")
    }
  }
}
