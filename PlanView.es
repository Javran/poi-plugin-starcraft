import React, { Component } from 'react'

import {
  Button,
} from 'react-bootstrap'

import { starText, modifyPlans } from './utils'

// props:
// - mstId, star, planCount, actualCount
class PlanView extends Component {
  handleRemove = () => {
    const { mstId, star } = this.props
    modifyPlans( plans => {
      const newPlans = { ... plans }
      newPlans[mstId] = { ... plans[mstId] }
      delete newPlans[mstId][star]
      return newPlans
    })
  }
  render() {
    const { star, planCount, actualCount } = this.props
    const done = actualCount >= planCount
    return (
      <div style={{display: "flex", alignItems: "center", fontSize: "16px"}}>
        <div style={{flex: 1}} className="star-text">{starText(star)}</div>
        <div style={{flex: 1, display: "flex"}}>
          <div className={done ? "text-success" : "text-danger"}>{actualCount}</div>
          <div style={{marginLeft:"2px"}}>/{planCount}</div>
        </div>
        <div>
          <Button
              onClick={this.handleRemove}
              bsStyle="warning">Remove
          </Button>
        </div>
      </div>)
  }
}

export {
  PlanView,
}
