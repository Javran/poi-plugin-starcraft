import React, { Component } from 'react'
import { SlotitemIcon } from 'views/components/etc/icon'

import {
  Button,
  Collapse,
} from 'react-bootstrap'

import { EquipListView } from './EquipListView'

const { FontAwesome } = window

// props:
// - equipType
// - catInfo
// - plans
class EquipCategoryView extends Component {
  constructor(...args) {
    super(...args)
    this.state = {
      collapsed: true,
    }
  }

  handleToggle = () => {
    this.setState({collapsed: ! this.state.collapsed })
  }

  render() {
    const et = this.props.equipType
    const ci = this.props.catInfo
    return (
      <div>
        <Button
            onClick={this.handleToggle}
            style={{
              width: "100%",
              margin: "2px",
              display:"flex", alignItems: "center",
            }} >
          <FontAwesome
              className="eqcat-collapse-toggle"
              style={{marginRight: "10px"}}
              name={this.state.collapsed ? "chevron-right" : "chevron-down"}
          />
          <div
              style={{flex: "1", textAlign: "left"}}
              key="name">{et.api_name}</div>
          <div>
          {
            ci.icons.map( (iconId,ind) =>
            <SlotitemIcon
                key={ind}
                slotitemId={iconId} className="equip-icon" />)
          }
          </div>
        </Button>
        <Collapse
            timeout={100}
            in={! this.state.collapsed}>
          <div
              style={{paddingLeft:"20px"}}
          >
            <EquipListView
                plans={this.props.plans}
                equipMstIds={this.props.catInfo.group}
            />
          </div>
        </Collapse>
      </div>)
  }
}

export {
  EquipCategoryView,
}
