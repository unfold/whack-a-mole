import React, { Component, PropTypes } from 'react'
import look, { StyleSheet } from 'react-look'
import AvatarListItem from './AvatarListItem'
import Button from './Button'
import emojiMap from '../utils/emoji-map.json'
import map from 'lodash/map'
import cssEase from 'css-ease'

let styles

@look
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
      return <div className={styles.container} />
    }

    return (
      <div className={styles.container}>
        <Button className={styles.button} onClick={this.onPick}>
          Pick {emojiMap[this.state.selected]} as your avatar
        </Button>

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

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: `opacity .4s ${cssEase['ease-out-cubic']}, transform 1s ${cssEase['ease-out-expo']}`,
    transitionDelay: '.4s',

    'visible=false': {
      zIndex: -1,
      opacity: 0,
      transform: 'translate3d(0, 50%, 0)',
    },
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
    transition: `.7s transform ${cssEase['ease-out-expo']}, .2s opacity ${cssEase['ease-out-cubic']}`,

    'selected=null': {
      opacity: 0,
      transform: 'translate3d(-50%, 2em, 0)',
    },
  },
})
