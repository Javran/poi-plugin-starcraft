import React, { Component } from 'react'
import {
  Button,
} from 'react-bootstrap'

class ControlPanel extends Component {
  render() {
    const btnStyle = {marginRight: "5px"}
    const labelStyle = {
      marginRight: "5px", marginLeft: "5px",
      paddingTop: "5px",
      width: "60px",
    }
    return (
      <div style={{display: "flex", marginBottom: "10px", flexDirection: "column"}}>
        <div style={{display: "flex", marginBottom: "2px", alignItems:"center"}}>
          <div style={{ ... labelStyle}} >Controls</div>
          <Button style={ {... btnStyle}} title="Expand only non-empty categories">Auto</Button>
          <Button style={ {... btnStyle}}>Expand All</Button>
          <Button style={ {... btnStyle}}>Collapse All</Button>
        </div>
        <div style={{display: "flex", marginBottom: "2px", alignItems:"center"}}>
          <div style={{ ... labelStyle}} >Views</div>
          <Button style={ {... btnStyle}}>View Mode</Button>
          <Button style={ {... btnStyle}}>Screenshot</Button>
        </div>
      </div>
    )
  }
}

export {
  ControlPanel,
}
