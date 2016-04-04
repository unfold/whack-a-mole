import React, { Component } from 'react'
import ParticipantView from './ParticipantView'
import Dashboard from './Dashboard'

export default class Application extends Component {
  state = {
    admin: false,
  }

  componentDidMount() {
    window.addEventListener('keyup', ({ keyCode }) => {
      if (keyCode === 65) {
        this.setState({
          admin: !this.state.admin,
        })
      }
    })
  }

  render() {
    return (
      <div>
        {
          this.state.admin
          ? <Dashboard />
          : <ParticipantView />
        }
      </div>
    )
  }
}
