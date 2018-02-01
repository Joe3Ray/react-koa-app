import './index.less'

import React from 'react'
import ReactDOM from 'react-dom'
import {createBrowserHistory} from 'history'
import {Provider} from 'react-redux'
import {Router} from 'react-router'
import { Route, Switch, Redirect } from 'react-router-dom'

import configureStore from './store'
import lazyloader from './components/lazyloader'

const history = createBrowserHistory()
const store = configureStore(history)

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route path='/hello' component={lazyloader('hello')} />
          <Route path='/' component={lazyloader('app')} />
          <Redirect to='/app' />
        </Switch>
      </Router>
    </Provider>,
    document.getElementById('app')
  )
}

render()
