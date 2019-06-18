import { Indicator } from "@senayan/indicator-react"
import * as React from "react"
import { Button, Text } from "react-native"

interface IMyComponentState {
  nextComponent?: any
}

class MyComponent extends React.Component<{}, IMyComponentState> {
  public state: IMyComponentState = {}

  public render() {
    if (this.state.nextComponent) {
      return this.state.nextComponent
    } else {
      return <Button onPress={() => this.onButtonPress()} title="Button 1" />
    }
  }

  private onButtonPress() {
    const element = import("./hello1").then(v => v.default)
    this.setState({
      nextComponent: (
        <Indicator
          promise={element}
          loading={<Text>Loading (component)</Text>}
          error={(props: any) => <Text>Error: {props.message}</Text>}
        />
      )
    })
  }
}

;(window as any).mainComponent = <MyComponent />
