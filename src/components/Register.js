/* eslint-disable max-len */

import React, { Component, PropTypes } from 'react'
import FillViewportHeight from './FillViewportHeight'
import AvatarPicker from './AvatarPicker'
import look, { StyleSheet } from 'react-look'
import Button from './Button'
import cssEase from 'css-ease'
import analytics from '../utils/analytics'
import WhackAMoleLogo from '../assets/whack-a-mole-logo.svg'

let styles

@look
export default class Register extends Component {
  static propTypes = {
    onRegister: PropTypes.func.isRequired,
    gameStarted: PropTypes.bool,
  }

  state = {
    showAvatarPicker: false,
  }

  componentDidMount() {
    analytics.page('Register')
  }

  onSelectAvatar(avatar) {
    this.props.onRegister({
      score: 0,
      avatar,
    })
  }

  onSelectAvatar = ::this.onSelectAvatar

  showAvatarPicker() {
    analytics.page('Select avatar')
    this.setState({ showAvatarPicker: !this.state.showAvatarPicker })
  }

  showAvatarPicker = ::this.showAvatarPicker

  render() {
    return (
      <FillViewportHeight>
        <div className={styles.register}>
          <div className={styles.test}>
          </div>
          <svg className={styles.unfoldLogo} viewBox="0 0 142 23" xmlns="http://www.w3.org/2000/svg">
            <path d="M32.022 1.054c-.003-.129.061-.313.362-.318l6.194-.008c.325 0 .325 0 .325.275l.013 7.922s8.315-5.438 13.871-8.691c.461-.248.427-.061.433.311l.034 20.917c.004.313.003.374-.361.376l-6.259.012c-.326.003-.295-.034-.295-.378l-.013-7.883s-8.741 5.686-13.908 8.781c-.227.151-.363.152-.362-.185-.012-8.278-.019-11.725-.036-21.131zM55.315 21.85c-.298 0-.33.03-.33-.435-.009-5.928-.022-13.405-.032-20.26-.005-.406-.003-.438.33-.441l15.885-.027c.291 0 .256.064.258.312.005 1.372.01 3.401.008 4.611 0 .253.032.28-.259.284l-8.552.014.044 4.083 7.667-.011c.256-.001.226.124.226.369 0 1.31.004 3.665.008 5.133.003.28.031.309-.26.312l-7.675.012s.011 3.318.012 5.591c.003.345-.031.435-.295.435l-7.037.016zM95.296 11.278c.008 6.604-5.652 11.262-12.009 11.271-7.009.011-12.031-4.904-12.041-11.264-.008-6.7 5.456-11.262 12.007-11.274 6.261-.008 12.031 4.315 12.044 11.266zm-16.184-.04c0 2.591 1.707 4.084 4.165 4.08 2.362-.006 4.161-1.571 4.153-4.091-.001-2.397-1.642-3.893-4.166-3.889-2.556.005-4.156 1.627-4.152 3.9zM112.345 21.471c.001.248-.028.28-.325.28l-15.328.025c-.33.003-.335.035-.338-.277 0-3.865-.01-7.046-.014-10.258l-.02-10.32c0-.31 0-.278.328-.28l6.981-.012c.295.004.326.032.326.282.005 2.432.022 15.061.022 15.061l7.998-.016c.296 0 .36.059.362.312l.007 5.203zM134.245 8.05c-.983-4.869-4.489-7.465-10.799-7.452l-9.595.015c-.297.001-.327.065-.326.31.014 7.919.021 12.629.037 20.547-.002.312.033.275.322.274l8.784-.012c3.682-.005 6.205-.891 8.45-2.227l10.203-6.472-.014-9.537-7.062 4.554zm-11.727 7.823l-1.503.005-.013-9.414 1.572-.005c2.326-.007 4.095 1.211 4.106 4.608.005 3.643-1.964 4.802-4.162 4.806zM.36 6.723l.016 9.514 9.095-5.813.005 3.747c.004 4.795 3.847 8.532 10.272 8.52 7.066-.015 10.767-3.229 10.758-8.248l-.023-13.464c0-.219 0-.219-.164-.222l-7.108.01c-.229 0-.232.035-.229.224l.02 12.092c.004 2.149-1.011 2.995-2.747 2.996-1.77.004-2.751-.864-2.761-2.984l-.018-12.066c0-.251-.227-.251-.227-.251l-7.645.015-9.245 5.929z" />
          </svg>

          <WhackAMoleLogo className={styles.whackAMoleLogo} />

          <Button
            disabled={this.props.gameStarted}
            className={styles.button}
            onClick={this.showAvatarPicker}
          >
            { this.props.gameStarted
              ? 'Game is ongoing. Please wait'
              : 'Join tournament'
            }
          </Button>

          <AvatarPicker
            visible={this.state.showAvatarPicker}
            onSelectAvatar={this.onSelectAvatar}
          />
        </div>
      </FillViewportHeight>
    )
  }
}

styles = StyleSheet.create({
  register: {
    padding: '1em 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  unfoldLogo: {
    width: '7.8em',
    fill: '#FD0042',
    transition: `.4s opacity ${cssEase['ease-in-cubic']}`,

    'showAvatarPicker=true': {
      opacity: 0,
    },
  },

  whackAMoleLogo: {
    transform: 'translateX(4%)',
    width: '16em',
    fill: '#FD0042',
    margin: '3em 0 4em',
    transition: `.4s opacity ${cssEase['ease-in-cubic']}`,

    '@media(min-height:800px)': {
      width: '24em',
    },

    'showAvatarPicker=true': {
      opacity: 0,
    },
  },

  button: {
    transition: `.4s transform ${cssEase['ease-in-expo']}, .4s opacity ${cssEase['ease-in-cubic']}`,

    ':disabled': {
      color: '#999',
    },

    'showAvatarPicker=true': {
      opacity: 0,
      transform: 'translate3d(0, 1em, 0)',
    },
  },
})
