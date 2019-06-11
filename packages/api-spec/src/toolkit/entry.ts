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

    switch (jsonObject.$schema) {
      case "https://nieltg.github.com/senayan/schemas/entry-v1.json":
        break

      default:
        throw new Error("Unknown schema")
    }

    throw new Error("Invalid payload")
  }
}
