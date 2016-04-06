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
    // const participants = map(this.props.participants, (participant, id) => (
    //   <div key={id}>
    //     <div>{participant.avatar}</div>
    //     <div>Score: {participant.score}</div>
    //   </div>
    // ))

    if (this.props.gameStarted) {
      return <Scoreboard participants={this.props.participants} />
    }

    return <Lounge participants={this.props.participants} />
  }
}
