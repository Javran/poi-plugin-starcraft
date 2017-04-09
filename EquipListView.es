import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap'

import { EquipView } from './EquipView'
import { getIconId } from './equiptype'


// props:
// - equipMstIds
// - plans
class SEquipListView extends Component {
  render () {
    // equipment list for those that has plans.
    const equipList = []
    // equipment list for those that doesn't have plans
    const equipListNoPlan = []
    const $equips = this.props.$equips

    this.props.equipMstIds.map( mstId => {
      const plans = this.props.plans[mstId]
      const $equip = $equips[mstId]
      const name = $equip.api_name
      const iconId = getIconId( $equip )

      if (plans) {
        equipList.push( {mstId, name, iconId, plans } )
      } else {
        equipListNoPlan.push( {mstId, name, iconId} )
      }
    })

    return (
      <ListGroup style={{marginBottom:"0"}}>
        {
          equipList.map( (args,ind) => {
            return (
              <ListGroupItem
                  style={{padding: "0"}}
                  key={ind}>
                <div>
                  <EquipView
                      { ... args }
                  />
                </div>
              </ListGroupItem>)
          })
        }
        {
          equipListNoPlan.length > 0 &&
          <ListGroupItem
              style={{padding: "0"}}
              key="noplan">
            {JSON.stringify(equipListNoPlan)}
          </ListGroupItem>
        }
      </ListGroup>
    )
  }
}

const EquipListView = connect(
  (state,props) => {
    const { $equips } = state.const
    return { $equips }
  })(SEquipListView)

export {
  EquipListView,
}
