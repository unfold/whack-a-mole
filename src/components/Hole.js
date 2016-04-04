import React, { Component, PropTypes } from 'react'

export default class Hole extends Component {
  static propTypes = {
    number: PropTypes.number.isRequired,
    hasMole: PropTypes.bool.isRequired,
    onWhack: PropTypes.func.isRequired,
  }

  onClick() {
    this.props.onWhack(this.props.number)
  }

  onClick = ::this.onClick

  render() {
    return (
      <div
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '100%',
          background: this.props.hasMole ? '#333' : '#999',
        }}
        onClick={this.onClick}
      />
    )
  }
}
