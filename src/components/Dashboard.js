import React, { Component, PropTypes } from 'react'
import { connect } from 'react-firebase'
import loader from '../decorators/loader'
import analytics from '../utils/analytics'
import Lounge from './Lounge'
import Scoreboard from './Scoreboard'

@connect(() => ({
  participants: 'participants',
  gameStarted: 'status/gameStarted',
}))

@loader()

export default class Dashboard extends Component {
  static propTypes = {
    gameStarted: PropTypes.bool,
    participants: PropTypes.object,
  }

  componentDidMount() {
    analytics.page('Dashboard')
  }

  render() {
    if (this.props.gameStarted && this.props.participants) {
      return <Scoreboard participants={this.props.participants} />
    }

    return <Lounge participants={this.props.participants} />
  }
}
