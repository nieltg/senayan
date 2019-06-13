export type Verifier = (value: any) => boolean

// tslint:disable-next-line: interface-name
export interface VerifierMap {
  [key: string]: Verifier
}
