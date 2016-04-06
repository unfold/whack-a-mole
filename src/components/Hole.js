import React, { Component, PropTypes } from 'react'
import look, { StyleSheet } from 'react-look'
import cssEase from 'css-ease'

let styles

@look
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
      <div className={styles.holeWrapper}>
        <div className={styles.hole} onClick={this.onClick}>
          <div className={styles.holeInner} />
        </div>
      </div>
    )
  }
}

styles = StyleSheet.create({
  holeWrapper: {
    width: '33.3%',
    padding: '.5em',
  },

  hole: {
    position: 'relative',
    width: '100%',
    paddingBottom: '100%',
    borderRadius: '100%',
    backgroundColor: '#F2F2F2',
    WebkitTapHighlightColor: 'rgba(255, 255, 255, .4)',
  },

  holeInner: {
    borderRadius: '100%',
    position: 'absolute',
    top: '10%',
    right: '10%',
    bottom: '10%',
    left: '10%',
    opacity: 0,
    backgroundColor: '#FF0077',
    background: 'linear-gradient(-180deg, #FF0077 0%, #FD0042 100%)',
    boxShadow: '0px 2px 8px 0px rgba(0,0,0,0.19)',
    transform: 'scale(.1)',
    transition: `.2s ${cssEase['ease-out-cubic']}, opacity .2s ${cssEase['ease-in-cubic']}`,

    'hibernating=true': {
      background: 'linear-gradient(-180deg, #A5A5A5 0%, #999 100%)',
    },

    ':active': {
      transform: 'scale(1.1)',
    },

    'hasMole=true': {
      opacity: 1,
      transform: 'scale(1)',
      transition: `.3s ${cssEase['ease-out-back']}`,
    },
  },
})
