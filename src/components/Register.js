import React, { Component, PropTypes } from 'react'

export default class Register extends Component {
  static propTypes = {
    onRegister: PropTypes.func.isRequired,
  }

  onRegister(event) {
    event.preventDefault()
    const participant = {
      score: 0,
      image: 'bob',
    }
    this.props.onRegister(participant)
  }

  render() {
    return (
      <div className="Register">
        <button onClick={::this.onRegister}>Register</button>
      </div>
    )
  }
}
