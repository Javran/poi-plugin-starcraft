import React, { Component } from 'react'

class EquipView extends Component {
  render() {
    return (<div>{ JSON.stringify(this.props) }</div>)
  }
}

export {
  EquipView,
}
