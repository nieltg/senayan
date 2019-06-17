import { Channel0 } from "@senayan/api-spec"

import axios from "axios"
import { Container, IExportMap } from "./container"

async function loadChannel(url: string) {
  const response = await axios(url, { method: "GET" })
  const jsonData = response.data

  if (!Channel0.verify(jsonData)) {
    throw new Error("Response is invalid")
  }
  return jsonData
}

declare const window: any

export async function load(url: string, exportMap: IExportMap = {}) {
  const channel = await loadChannel(url)

  const container = new Container(channel.baseUri, exportMap)
  await container.load(channel.mainChunkId)

  return window.mainComponent
}
