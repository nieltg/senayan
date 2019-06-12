export interface IEntryDescriptor {
  chunks: string[]
  asyncs?: string[]
}

// tslint:disable-next-line: no-namespace
export namespace IEntryDescriptor {
  export function convert(jsonValue: any) {
    if (!jsonValue.$schema) {
      throw new Error("No schema information")
    }

    switch (jsonValue.$schema) {
      case "https://nieltg.github.com/senayan/schemas/entry-v1.json":
        const value: IEntryDescriptor = jsonValue

        if (Array.isArray(value.chunks)) {
          return value
        }
        break

      default:
        throw new Error("Unknown schema")
    }

    throw new Error("Invalid payload")
  }
}
