import React, { Component, PropTypes } from 'react'
import { connect } from 'react-firebase'
import Register from './Register'
import Game from './Game'

@connect(() => ({}), firebase => ({
  register: participant => {
    const ref = firebase.child('participants').push(participant)
    ref.onDisconnect().remove()

    return ref.key()
  },
}))

export default class ParticipantView extends Component {
  static propTypes = {
    gameStarted: PropTypes.bool,
    register: PropTypes.func.isRequired,
  }

  state = {
    participantId: null,
  }

  onRegister(participant) {
    const participantId = this.props.register(participant)
    this.setState({ participantId })
  }

  render() {
    return (
      <div className="PlayerView">
        { !this.state.participantId
          ? <Register onRegister={::this.onRegister} />
          : <Game participantId={this.state.participantId} />
        }
      </div>
    )
  }
}
