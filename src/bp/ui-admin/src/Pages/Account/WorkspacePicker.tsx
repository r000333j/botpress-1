import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Card, CardBody } from 'reactstrap'
import api from '~/api'
import { setActiveWorkspace } from '~/Auth'

import logo from '../../media/nobg_white.png'

class WorkspacePicker extends Component {
  state = {
    hasWorkspace: false
  }

  componentDidMount() {
    // tslint:disable-next-line: no-floating-promises
    this.loadWorkspaces()
  }

  async loadWorkspaces() {
    const { data: workspaces } = await api.getSecured().get('/auth/me/workspaces')
    if (workspaces.length) {
      setActiveWorkspace(workspaces[0].workspace)
      this.setState({ hasWorkspace: true })
    }
  }

  render() {
    if (this.state.hasWorkspace) {
      return <Redirect to="/" />
    }

    return (
      <div className="centered-container">
        <div className="middle">
          <div className="inner">
            <img className="logo" src={logo} alt="loading" />
            <Card body>
              <CardBody className="login-box">Sorry, you don't have access to any workspace.</CardBody>
            </Card>
          </div>
        </div>
      </div>
    )
  }
}

export default WorkspacePicker
