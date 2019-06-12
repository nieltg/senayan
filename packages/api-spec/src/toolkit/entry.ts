import { ConverterMap } from "../common"

export interface IEntryDescriptor {
  chunks: string[]
  asyncs?: string[]
}

const converters: ConverterMap<IEntryDescriptor> = {
  "https://nieltg.github.com/senayan/schemas/entry-v1.json": (value: any) => {
    const chunks = value.chunks
    if (!Array.isArray(chunks) || chunks.length === 0) {
      throw new Error("Invalid payload")
    }

    return value
  }
}

// tslint:disable-next-line: no-namespace
export namespace IEntryDescriptor {
  export function convert(jsonValue: any) {
    if (!jsonValue.$schema) {
      throw new Error("No schema information")
    }

    const converter = converters[jsonValue.$schema]
    if (!converter) {
      throw new Error("Unknown schema")
    }

    return converter(jsonValue)
  }
}
