import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'

import store, { history } from '../store'
import { extractCookie } from '../utils/cookies'
import App from '../App/Layout'
import Auth from '../Auth'
import ChangePassword from '../Pages/Account/ChangePassword'
import LoginPage from '../Pages/Account/Login'
import RegisterPage from '../Pages/Account/Register'
import WorkspacePicker from '../Pages/Account/WorkspacePicker'
import Bot from '../Pages/Bot'
import Confusion from '../Pages/Confusion'
import MyAccount from '../Pages/MyAccount'
import Server from '../Pages/Server'
import Modules from '../Pages/Server/Modules'
import Debug from '../Pages/Tools/Debug'
import Workspace from '../Pages/Workspace'

import PrivateRoute from './PrivateRoute'
import Tools from '~/Pages/Tools'

export const makeMainRoutes = () => {
  const auth = new Auth()

  const ExtractToken = () => {
    const [isReady, setIsReady] = useState(false)
    auth.setSession({ expiresIn: 7200, idToken: extractCookie('userToken') })

    useEffect(() => {
      const getWorkspaces = async () => {
        try {
          await auth.setupWorkspace()
          setIsReady(true)
        } catch (err) {
          window.location.href = '/admin/pickWorkspace'
        }
      }

      // tslint:disable-next-line: no-floating-promises
      getWorkspaces()
    })

    return isReady ? <Redirect to="/" /> : null
  }

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/login/:strategy?/:workspace?" render={props => <LoginPage auth={auth} {...props} />} />
          <Route path="/register/:strategy?/:workspace?" render={props => <RegisterPage auth={auth} {...props} />} />
          <Route path="/setToken" component={ExtractToken} />
          <Route path="/changePassword" render={props => <ChangePassword auth={auth} {...props} />} />
          <Route path="/pickWorkspace" render={props => <WorkspacePicker auth={auth} {...props} />} />
          <PrivateRoute path="/" auth={auth} component={App}>
            <Switch>
              <Route path="/profile" component={MyAccount} />
              <Route path="/confusion" component={Confusion} />
              <Route path="/workspace" component={Workspace} />
              <Route path="/server" component={Server} />
              <Route path="/bot" component={Bot} />
              <Route path="/tools" component={Tools} />
              <Route path="/modules" component={Modules} />
              <Redirect from="/" to="/workspace/bots" />
            </Switch>
          </PrivateRoute>
        </Switch>
      </ConnectedRouter>
    </Provider>
  )
}
