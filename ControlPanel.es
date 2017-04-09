import React, { Component } from 'react'
import {
  Button,
} from 'react-bootstrap'

// props:
// - onControlAction( "Auto" /  "ExpandAll" / "CollapseAll" )
class ControlPanel extends Component {
  handleAction = action => () => {
    this.props.onControlAction(action)
  }
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
          <Button
              style={ {... btnStyle}}
              onClick={this.handleAction("Auto")}
              title="Expand only non-empty categories">Auto</Button>
          <Button
              onClick={this.handleAction("ExpandAll")}
              style={ {... btnStyle}}>Expand All</Button>
          <Button
              onClick={this.handleAction("CollapseAll")}
              style={ {... btnStyle}}>Collapse All</Button>
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
