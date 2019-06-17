import axios from "axios"
import joinUrls from "url-join"

export interface IExportMap {
  [key: string]: any
}

export class Container {
  private self: any

  constructor(public baseUrl: string, public exportMap: IExportMap = {}) {
    this.self = {
      exportedModules: this.exportMap,
      loadAll: async (...chunkIds: string[]) => {
        return Promise.all(chunkIds.map(chunkId => this.load(chunkId)))
      }
    }
  }

  public async load(chunkId: string) {
    const response = await axios(joinUrls(this.baseUrl, chunkId), {
      method: "GET"
    })

    const chunkFunc = new Function("self", response.data)
    chunkFunc(this.self)
  }
}
