import React, { Component } from 'react'
import { SlotitemIcon } from 'views/components/etc/icon'

import {
  Button,
  Collapse,
} from 'react-bootstrap'

import { EquipListView } from './EquipListView'

const { FontAwesome } = window

// props:
// - collapsed
// - equipType
// - catInfo
// - plans
// - onToggle
// - viewMode
class EquipCategoryView extends Component {
  render() {
    const et = this.props.equipType
    const ci = this.props.catInfo
    const {$equips, equipLevels, collapsed} = this.props
    const hasPlan = ci.group.some( mstId => this.props.plans[mstId])

    // for view mode, no need of showing anything .. if there's nothing to show...
    if (this.props.viewMode && (collapsed || ! hasPlan)) {
      return null
    }

    return (
      <div>
        <Button
            onClick={this.props.onToggle}
            style={{
              width: "100%",
              margin: "2px",
              display:"flex", alignItems: "center",
            }} >
          { !this.props.viewMode &&
            (<FontAwesome
                 className="eqcat-collapse-toggle"
                 style={{marginRight: "10px"}}
                 name={collapsed ? "chevron-right" : "chevron-down"}
             />)
          }
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
        <Collapse timeout={100} in={!collapsed}>
          <div
              style={{paddingLeft:"20px"}}
          >
            <EquipListView
                viewMode={this.props.viewMode}
                plans={this.props.plans}
                equipMstIds={this.props.catInfo.group}
                $equips={$equips}
                equipLevels={equipLevels}
            />
          </div>
        </Collapse>
      </div>)
  }
}

export {
  EquipCategoryView,
}
