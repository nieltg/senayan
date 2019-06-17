import * as React from "react"

interface IErrorComponentProps {
  message: string
}

interface IProps {
  promise: Promise<React.ReactNode>

  error: React.ElementType<IErrorComponentProps>
  loading: React.ReactNode
}

interface IState {
  promise?: object

  node?: React.ReactNode
  message?: string
}

export default class Indicator extends React.Component<IProps, IState> {
  constructor(props: Readonly<IProps>) {
    super(props)
    this.handlePromise(props.promise)
  }

  public componentDidUpdate(prevProps: Readonly<IProps>) {
    if (this.props.promise !== prevProps.promise) {
      this.handlePromise(this.props.promise)
    }
  }

  public render() {
    if (this.state.node) {
      return this.state.node
    } else if (this.state.message) {
      return <this.props.error message={this.state.message} />
    } else {
      return this.props.loading
    }
  }

  private async handlePromise(promise?: Promise<React.ReactNode>) {
    this.setState({ promise })
    if (promise) {
      try {
        this.setStateIfValid(promise, { node: await promise })
      } catch (e) {
        this.setStateIfValid(promise, { message: String(e) })
      }
    }
  }

  private setStateIfValid(promise: object, state: Readonly<IState>) {
    if (this.state.promise === promise) {
      this.setState(state)
    }
  }
}
