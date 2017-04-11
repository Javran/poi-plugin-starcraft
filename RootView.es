import React, { Component } from 'react'

import { isEquipMasterEqual } from './utils'
import { EquipCategoryView } from './EquipCategoryView'

const { _ } = window

class RootView extends Component {
  shouldComponentUpdate(nextProps) {
    const noEquips = x => {
      /*eslint-disable no-unused-vars*/
      const { $equips, onToggle, ... remained } = x
      return remained
      /* eslint-enable no-unused-vars */
    }

    return ! _.isEqual( noEquips(this.props), noEquips(nextProps)) ||
           ! isEquipMasterEqual( this.props.$equips, nextProps.$equips )
  }
  render() {
    const {
      equipTypes,
      equipTypeInfo,
      equipTypeCollapsed,
      viewMode,
      $equips,
      plans,
      equipLevels,
      onToggle,
    } = this.props
    return (
      <div>
        {
          Object.keys(equipTypes).map( (k,ind) => {
            const et = equipTypes[k]
            const ci = equipTypeInfo.catInfo[et.api_id]
            return (
              <EquipCategoryView
                  viewMode={viewMode}
                  key={ind}
                  collapsed={equipTypeCollapsed[k]}
                  onToggle={onToggle(k)}
                  equipType={et}
                  catInfo={ci}
                  plans={plans}
                  $equips={$equips}
                  equipLevels={equipLevels}
            />)
          })
        }
      </div>)
  }
}

export {
  RootView,
}
