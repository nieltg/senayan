export type Converter<T> = (value: any) => T

// tslint:disable-next-line: interface-name
export interface ConverterMap<T> {
  [key: string]: Converter<T>
}
