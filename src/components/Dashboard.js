import React, { Component } from 'react'
import { connect } from 'react-firebase'

@connect(() => ({
  participants: 'participants',
}))

export default class Dashboard extends Component {
  render() {
    return (
      <div>

      </div>
    )
  }
}
