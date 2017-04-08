import React, { Component } from 'react'
import { SlotitemIcon } from 'views/components/etc/icon'

// props:
// - equipType
// - catInfo
class EquipCategoryView extends Component {
  render() {
    const et = this.props.equipType
    const ci = this.props.catInfo
    return (
      <div>
        <div key="name">{et.api_name}</div>
        {
          ci.icons.map( (iconId,ind) =>
            <SlotitemIcon
                key={ind}
                slotitemId={iconId} className="equip-icon" />)
        }
      </div>)
  }
}

export {
  EquipCategoryView,
}
