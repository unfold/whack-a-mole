import React, { Component, PropTypes } from 'react'
import { connect } from 'react-firebase'
import { StyleSheet } from 'react-look'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 10,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    textAlign: 'center',
    fontSize: '0.8em',
    textTransform: 'uppercase',
    background: 'rgba(255, 255, 255, .9)',
  },
})

@connect(() => ({
  connected: '.info/connected',
}))
export default class ConnectionMessage extends Component {
  static propTypes = {
    connected: PropTypes.bool,
  }

  render() {
    if (this.props.connected) {
      return null
    }

    return (
      <div className={styles.container}>
        Connecting
      </div>
    )
  }
}
