import ReactDOM from 'react-dom'
import React, { Component } from 'react'
const { $ } = window
import { Provider } from 'react-redux'

import { store } from 'views/create-store'

$('#fontawesome-css')
  .setAttribute('href', require.resolve('font-awesome/css/font-awesome.css'))

class Main extends Component {
  render() {
    const xs = store.getState().const.$equipTypes
    return (
      <div>
        {
          Object.keys(xs).map( (k,ind) => <div key={ind}>{JSON.stringify(xs[k])}</div> )
        }
      </div>
    )
  }
}

window.store = store

ReactDOM.render(
 <Provider store={store}>
   <Main />
 </Provider>,
  $("#content-root"))
