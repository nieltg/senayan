import { load } from "@senayan/agent"
import { Indicator } from "@senayan/indicator-react"
import React, { ReactNode } from "react"
import { StyleSheet, Text, View } from "react-native"

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center"
  }
})

const App = () => (
  <View style={styles.container}>
    <Indicator
      promise={
        load("https://3150060f.ngrok.io/config.json") as Promise<ReactNode>
      }
      loading={<Text>Loading...</Text>}
      error={(props: any) => <Text>Error: {props.message}</Text>}
    />
  </View>
)
export default App
