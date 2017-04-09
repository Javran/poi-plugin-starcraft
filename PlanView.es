import React, { Component } from 'react'

import {
  Button,
} from 'react-bootstrap'

// props:
// - star, count
// - onClickEdit
class PlanView extends Component {
  render() {
    const { star, planCount, actualCount } = this.props
    const starText = star === 0 ? "Owned" : `★+${this.props.star}`
    const done = actualCount >= planCount
    return (
      <div style={{display: "flex", alignItems: "center", fontSize: "16px"}}>
        <div style={{flex: 1}} className="star-text">{starText}</div>
        <div style={{flex: 1, display: "flex"}}>
          <div className={done ? "text-success" : "text-danger"}>{actualCount}</div>
          <div style={{marginLeft:"2px"}}>/{planCount}</div>
        </div>
        <div>
          <Button
              onClick={this.props.onClickEdit}
              bsStyle="warning">Remove
          </Button>
        </div>
      </div>)
  }
}

export {
  PlanView,
}
