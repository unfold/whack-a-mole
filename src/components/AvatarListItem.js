import React, { Component, PropTypes } from 'react'

export default class AvatarListItem extends Component {
  static propTypes = {
    onSelect: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    emoji: PropTypes.string.isRequired,
  }

  onClick() {
    this.props.onSelect(this.props.name)
  }

  onClick = ::this.onClick

  render() {
    return (
      <span onClick={this.onClick}>{this.props.emoji}</span>
    )
  }
}
