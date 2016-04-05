import React, { Component, PropTypes } from 'react'
import look, { StyleSheet } from 'react-look'

let styles

@look
export default class AvatarListItem extends Component {
  static propTypes = {
    onSelect: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    emoji: PropTypes.string.isRequired,
    highlighted: PropTypes.bool,
  }

  onClick() {
    this.props.onSelect(this.props.name)
  }

  onClick = ::this.onClick

  render() {
    return (
      <div className={styles.item} onClick={this.onClick}>
        <span className={styles.emoji}>{this.props.emoji}</span>
      </div>
    )
  }
}

styles = StyleSheet.create({
  item: {
    padding: '1em',
    transform: 'scale(2)',
    transition: 'transform .3s ease-out',
    userSelect: 'none',

    'highlighted=true': {
      transform: 'scale(4)',
    },
  },

  emoji: {
    fontFamily: 'AppleColorEmoji',
  },
})
