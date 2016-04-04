import React, { Component, PropTypes } from 'react'
import { connect } from 'react-firebase'

@connect(props => ({
  score: `participants/${props.participantId}/score`,
}), (firebase, props) => ({
  incrementScore: () => {
    firebase
      .child('participants').child(props.participantId).child('score')
      .transaction(score => score + 1)
  },
}))

export default class Game extends Component {
  static propTypes = {
    participantId: PropTypes.string.isRequired,
    score: PropTypes.number,
  }

  render() {
    return (
      <div>
        <button onClick={this.props.incrementScore}>Increment score</button>
        Score: {this.props.score}
      </div>
    )
  }
}
