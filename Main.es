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
    const {equipTypes, equipTypeInfo, plans} = this.props
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
    }
  })(Main)

ReactDOM.render(
 <Provider store={store}>
   <MainInst />
 </Provider>,
  $("#content-root"))
