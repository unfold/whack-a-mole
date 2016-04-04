import React, { Component, PropTypes } from 'react'
import emojiMap from '../utils/emoji-map.json'
import map from 'lodash/map'
import AvatarListItem from './AvatarListItem'


export default class Register extends Component {
  static propTypes = {
    onRegister: PropTypes.func.isRequired,
  }

  onSelectAvatar(avatar) {
    this.props.onRegister({
      score: 0,
      avatar,
    })
  }

  onSelectAvatar = ::this.onSelectAvatar

  render() {
    return (
      <div className="Register">
        {map(emojiMap, (emoji, key) => (
          <AvatarListItem key={key} onSelect={this.onSelectAvatar} name={key} emoji={emoji} />
        ))}
      </div>
    )
  }
}
