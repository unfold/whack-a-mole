import React, { Component, PropTypes } from 'react'
import { StyleSheet } from 'react-look'
import AvatarListItem from './AvatarListItem'
import Button from './Button'
import emojiMap from '../utils/emoji-map.json'
import map from 'lodash/map'

let styles

export default class AvatarPicker extends Component {
  static propTypes = {
    onSelectAvatar: PropTypes.func.isRequired,
    visible: PropTypes.bool,
  }

  state = {
    selected: null,
  }

  onSelect(avatar) {
    this.setState({
      selected: avatar,
    })
  }

  onPick() {
    this.props.onSelectAvatar(this.state.selected)
  }

  onSelect = ::this.onSelect
  onPick = ::this.onPick

  render() {
    if (!this.props.visible) {
      return <div />
    }

    return (
      <div className={styles.container}>
        { this.state.selected &&

          <Button className={styles.button} onClick={this.onPick}>
            Pick {emojiMap[this.state.selected]} as your avatar
          </Button>
        }

        <div className={styles.avatarList}>
          {map(emojiMap, (emoji, key) => (
            <AvatarListItem
              highlighted={this.state.selected === key}
              key={key}
              name={key}
              emoji={emoji}
              onSelect={this.onSelect}
            />
          ))}
        </div>
      </div>
    )
  }
}


styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'white',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  avatarList: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '.5em',
  },

  button: {
    whiteSpace: 'nowrap',
    position: 'fixed',
    zIndex: 1,
    bottom: '2em',
    left: '50%',
    transform: 'translateX(-50%)',
  },
})
