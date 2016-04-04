import React, { Component } from 'react'
import ParticipantView from './ParticipantView'
import Dashboard from './Dashboard'

const admin = false

export default class Application extends Component {
  render() {
    return (
      <div>
        {
          admin
          ? <Dashboard />
          : <ParticipantView />
        }
      </div>
    )
  }
}
