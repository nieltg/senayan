import { ConverterMap } from "../common"

// tslint:disable-next-line: interface-name
export interface Entry0 {
  chunks: string[]
  asyncs?: string[]
}

const converters: ConverterMap<Entry0> = {
  "https://nieltg.github.com/senayan/schemas/entry-0.json": (value: any) => {
    const chunks = value.chunks
    if (!Array.isArray(chunks) || chunks.length === 0) {
      throw new Error("Invalid payload")
    }

    return value
  }
}

// tslint:disable-next-line: no-namespace
export namespace Entry0 {
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
