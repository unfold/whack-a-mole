import React, { Component, PropTypes } from 'react'
import shuffle from 'lodash/shuffle'

export const avatars = require.context('../assets/avatars')

export default class AvatarIcon extends Component {
  static propTypes = {
    id: PropTypes.string,
  }

  static keys = shuffle(avatars.keys())

  render() {
    const { id, ...props } = this.props

    if (!id) {
      return null
    }

    const Avatar = avatars(id)

    return (
      <Avatar {...props} />
    )
  }
}
