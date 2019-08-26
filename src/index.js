import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import AppContainer from './App'

import { configureStore } from './store'
import { ROOT_URL } from './routing/frontend'

const store = configureStore()

window.store = store

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route
          path={ROOT_URL}
          component={AppContainer}
        />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root'));
