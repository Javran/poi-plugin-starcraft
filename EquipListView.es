import React, { Component } from 'react'

// props:
// - equipMstIds
class EquipListView extends Component {
  render () {
    return (
      <div>{JSON.stringify(this.props.equipMstIds)}</div>
    )
  }
}

export {
  EquipListView,
}
