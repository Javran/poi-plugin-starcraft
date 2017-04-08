import ReactDOM from 'react-dom'
import React, { Component } from 'react'

const { $ } = window
import { connect, Provider } from 'react-redux'
import { store } from 'views/create-store'
import { prepareEquipTypeInfo } from './equiptype'
import { EquipCategoryView } from './EquipCategoryView'

$('#fontawesome-css')
  .setAttribute('href', require.resolve('font-awesome/css/font-awesome.css'))

class Main extends Component {
  render() {
    const {equipTypes, equipTypeInfo} = this.props
    return (
      <div>
        {
          Object.keys(equipTypes).map( (k,ind) => {
            const et = equipTypes[k]
            const ci = equipTypeInfo.catInfo[et.api_id]
            return ci && ci.group.length > 0 && (<EquipCategoryView
                key={ind}
                equipType={et}
                catInfo={ci}
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
    return {
      equipTypeInfo,
      equipTypes,
    }
  })(Main)

ReactDOM.render(
 <Provider store={store}>
   <MainInst />
 </Provider>,
  $("#content-root"))
