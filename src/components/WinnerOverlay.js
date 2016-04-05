import React, { Component, PropTypes } from 'react'

export default class WinnerOverlay extends Component {
  static propTypes = {
    winner: PropTypes.object,
    participantWon: PropTypes.bool,
  }

  render() {
    return (
      <div>
        { this.props.participantWon ? 'YAAAH' : 'YOU LOST'}
      </div>
    )
  }
}
