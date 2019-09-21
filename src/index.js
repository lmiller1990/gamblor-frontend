import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import axios from 'axios'

import AppContainer from './App'
import { configureStore } from './store'
import { ROOT_URL } from './routing/frontend'
import { mockAxios } from './data/mockAxios'
import './index.css'

const store = configureStore()

window.store = store

if (process.env.REACT_APP_DEMO_MODE === 'true') {
  axios.get = mockAxios.get
}

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
