import React, { Component } from 'react'

import {
  Button,
  FormControl,
} from 'react-bootstrap'

import { SlotitemIcon } from 'views/components/etc/icon'
import NumericInput from 'react-numeric-input'

import { PlanView } from './PlanView'

const { FontAwesome } = window

// props:
// - mstId, name, iconId, plans
class EquipView extends Component {
  render() {
    const {mstId, name, iconId, plans} = this.props
    // sort plans because its is not guaranteed to be ordered.
    const planArr = Object.keys( plans ).map( k =>
      ({ star: parseInt(k,10), count: plans[k] })
    )
    planArr.sort( (x,y) => x.star - y.star )
    return (
      <div>
        <div style={{
          display:"flex",
          //background: "#666",
          borderBottom: "solid 1px #666",
          alignItems:"center"}}>
          <SlotitemIcon
              slotitemId={iconId} className="equip-icon" />
          <div>{name}</div>
        </div>
        <div style={{
          width: "80%", maxWidth:"500px",
          margin: "auto", marginBottom: "2px", marginTop:"2px"}} >
          {
            planArr.map( (args, ind) => (
              <PlanView
                  key={ind}
                  { ... args } />
            ))
          }
          <div style={{
            display: "flex", alignItems: "center",
            justifyContent: "space-between",
            minHeight: "50px"}}>
            <FontAwesome
                style={{marginRight: "10px", maxWidth: "100px"}}
                name="plus"
            />
            <FormControl
                style={{flex: 1, marginRight: "10px", maxWidth: "100px"}}
                componentClass="select">
              {
                [1,2,3,4,5].map((x, ind) =>
                  <option key={ind} value={x}>
                    {x}
                  </option>
                )
              }
            </FormControl>
            <div style={{flex: 1, marginRight: "10px", maxWidth: "100px"}} >
              <NumericInput
                  value={1}
                  className="form-control" />
            </div>
              <Button
                bsStyle="primary">
              Add
            </Button>
          </div>
        </div>
      </div>)
  }
}

// props:
// - equips
class AddNewEquipView extends Component {
  constructor() {
    super()
    this.state = {
      selected: "none",
    }
  }
  handleChange = (e) => {
    this.setState( { selected: e.target.value } )
  }

  render() {

    return (
      <div style={{
        display: "flex",
        margin: "5px",
        fontSize: "12px",
        alignItems: "center"}} >
        <FontAwesome
            style={{marginRight: "10px"}}
            name="plus"
        />
        <FormControl
            style={{marginRight: "10px",fontSize:"14px"}}
            onChange={this.handleChange}
            componentClass="select">
          <option key="none" value="none">New equipment plan</option>
          {
            this.props.equips.map((equip, ind) =>
              <option key={ind} value={equip.mstId}>
                {`${equip.mstId}: ${equip.name}`}
              </option>
            )
          }
        </FormControl>
        <Button
            disabled={this.state.selected ==="none"}
            bsStyle="primary">Add</Button>
      </div>
    )
  }
}

export {
  EquipView,
  AddNewEquipView,
}
