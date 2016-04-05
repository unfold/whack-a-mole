import React, { Component, PropTypes } from 'react'
import look, { StyleSheet } from 'react-look'
import cssEase from 'css-ease'
import AvatarIcon from './AvatarIcon'

let styles

@look
export default class AvatarListItem extends Component {
  static propTypes = {
    onSelect: PropTypes.func.isRequired,
    icon: PropTypes.string.isRequired,
    highlighted: PropTypes.bool,
  }

  onClick() {
    this.props.onSelect(this.props.icon)
  }

  onClick = ::this.onClick

  render() {
    return (
      <div className={styles.item} onClick={this.onClick}>
        <AvatarIcon id={this.props.icon} className={styles.icon} />
      </div>
    )
  }
}

styles = StyleSheet.create({
  item: {
    width: '2.5em',
    height: '2.5em',
    margin: '1em',
    transition: `.2s transform ${cssEase['ease-out-back']}`,

    'highlighted=true': {
      transform: 'scale(2)',
    },
  },

  icon: {
    width: '100%',
    height: '100%',
  },
})
