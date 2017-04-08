import ReactDOM from 'react-dom'
import React, { Component } from 'react'

const { $ } = window

class Main extends Component {
  render() {
    return (
      <div>
        Starcraft!
      </div>
    )
  }
}

ReactDOM.render(<Main />, $("#content-root"))
