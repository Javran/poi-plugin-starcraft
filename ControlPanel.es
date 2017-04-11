import React, { Component } from 'react'
import {
  Button,
} from 'react-bootstrap'

const { __ } = window

// props:
// - onControlAction( "Auto" /  "ExpandAll" / "CollapseAll" )
// - onToggleViewMode
// - viewMode
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
          <div style={{ ... labelStyle}} >{__("Content")}</div>
          <Button
              style={ {... btnStyle}}
              onClick={this.handleAction("Auto")}
              title={__("Expand only non-empty categories")}>{__("Default")}</Button>
          <Button
              onClick={this.handleAction("ExpandAll")}
              style={ {... btnStyle}}>{__("Expand All")}</Button>
          <Button
              onClick={this.handleAction("CollapseAll")}
              style={ {... btnStyle}}>{__("Collapse All")}</Button>
        </div>
        <div style={{display: "flex", marginBottom: "2px", alignItems:"center"}}>
          <div style={{ ... labelStyle}}>{__("View")}</div>
          <Button
              style={ {... btnStyle}}
              onClick={this.props.onToggleViewMode}
              active={this.props.viewMode}>{__("View Mode")}</Button>
          {
            /*
               // TODO: DOM to img
               <Button style={ {... btnStyle}}>Screenshot</Button>
            */
          }
        </div>
      </div>
    )
  }
}

export {
  ControlPanel,
}
