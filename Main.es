import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { connect, Provider } from 'react-redux'
import { store } from 'views/create-store'
import { prepareEquipTypeInfo } from './equiptype'
import { EquipCategoryView } from './EquipCategoryView'
import { PLUGIN_KEY } from './utils'

const { _, $ } = window
window.store = store

$('#fontawesome-css')
  .setAttribute('href', require.resolve('font-awesome/css/font-awesome.css'))

class Main extends Component {
  render() {
    const {equipTypes, equipTypeInfo, plans, $equips, equipLevels} = this.props
    return (
      <div style={{margin: "5px 10px 5px 5px"}} >
        {
          Object.keys(equipTypes).map( (k,ind) => {
            const et = equipTypes[k]
            const ci = equipTypeInfo.catInfo[et.api_id]
            return ci && ci.group.length > 0 && (
              <EquipCategoryView
                  key={ind}
                  equipType={et}
                  catInfo={ci}
                  plans={plans}
                  $equips={$equips}
                  equipLevels={equipLevels}
            />)
          })
        }
      </div>
    )
  }
}

const MainInst = connect(
  (state, props) => {
    const equipTypeInfo = prepareEquipTypeInfo( state.const.$equips )
    const equipTypes = state.const.$equipTypes

    const { $equips } = state.const
    const { equips } = state.info
    const equipLevels = {}
    Object.keys( equips ).map( rstId => {
      const { api_level, api_slotitem_id } = equips[rstId]
      const mstId = api_slotitem_id
      const l = equipLevels[mstId] || []
      l.push( api_level )
      equipLevels[mstId] = l
    })

    // plans[<equipment master id>] = undefined or object
    // plans[...][0 .. 10] = number of planned count
    // connected plans:
    // const plans = _.get(state,"config." + PLUGIN_KEY, {})
    // plan for testing:
    const plans = {
      "1": {"4":10, "6":12},
      "122": {"4":10, "6":12},
      "2": {"0":1,"2":4},
      "179": {"10":10},
      "4": {},
      "167": {},
    }

    return {
      equipTypeInfo,
      equipTypes,
      plans,
      $equips,
      equipLevels,
    }
  })(Main)

ReactDOM.render(
 <Provider store={store}>
   <MainInst />
 </Provider>,
  $("#content-root"))
