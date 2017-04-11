import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { connect, Provider } from 'react-redux'
import { store } from 'views/create-store'
import { prepareEquipTypeInfo } from './equiptype'
import { ControlPanel } from './ControlPanel'
import { keyPlans } from './utils'
import { RootView } from './RootView'
const { _, $ } = window
window.store = store

$('#fontawesome-css')
  .setAttribute('href', require.resolve('font-awesome/css/font-awesome.css'))

// TODO
// - screenshot on view mode?

class Main extends Component {
  constructor(props) {
    super()
    this.state = { ... this.prepareAutoCollapse(props), viewMode: false }
  }

  prepareAutoCollapse(props) {
    const equipTypeCollapsed = {}
    const {equipTypes, equipTypeInfo, plans} = props
    Object.keys( equipTypes ).map( k => {
      const et = equipTypes[k]
      const ci = equipTypeInfo.catInfo[et.api_id]
      equipTypeCollapsed[k] =
        ! ci.group.some( mstId => plans[mstId])
    })

    return { equipTypeCollapsed }
  }

  handleToggle = k => () => {
    this.setState( prevState => {
      const newState = { ... prevState }
      newState.equipTypeCollapsed = { ... prevState.equipTypeCollapsed }
      newState.equipTypeCollapsed[k] = ! prevState.equipTypeCollapsed[k]
      return newState
    })
  }

  handleControlAction = action => {
    const { equipTypes } = this.props
    if (action === "Auto") {
      this.setState( this.prepareAutoCollapse(this.props) )
      return
    }

    if (action === "ExpandAll" || action === "CollapseAll") {
      const collapsed = action === "CollapseAll"
      const equipTypeCollapsed = {}
      Object.keys( equipTypes ).map( k => {
        equipTypeCollapsed[k] = collapsed
      })

      this.setState( { equipTypeCollapsed } )
      return
    }

    console.error( `undefined action: ${action}` )
  }

  handleToggleViewMode = () => {
    this.setState( { viewMode: ! this.state.viewMode } )
  }

  render() {
    const { viewMode } = this.state
    return (
      <div style={{margin: "5px 10px 5px 5px"}} >
        <ControlPanel
            viewMode={viewMode}
            onToggleViewMode={this.handleToggleViewMode}
            onControlAction={this.handleControlAction}
        />
        <RootView
            onToggle={this.handleToggle}
            { ... this.props }
            { ... this.state }
        />
      </div>
    )
  }
}

const MainInst = connect(
  (state, props) => {
    const equipTypeInfo = prepareEquipTypeInfo( state.const.$equips )
    const equipTypesRaw = state.const.$equipTypes

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
    const plans = _.get(state,"config." + keyPlans, {})

    // filter equipTypes to remove empty categories
    // before any UI rendering happens
    const equipTypes = {}
    Object.keys(equipTypesRaw).map( (k,ind) => {
      const et = equipTypesRaw[k]
      const ci = equipTypeInfo.catInfo[et.api_id]
      if (ci && ci.group.length > 0)
        equipTypes[k] = et
    })

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
