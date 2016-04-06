import React, { Component, PropTypes } from 'react'
import times from 'lodash/times'
import Hole from './Hole'
import { StyleSheet } from 'react-look'
import { NUMBER_OF_HOLES, MIN_TIMER, MAX_TIMER } from '../constants'
import random from 'lodash/random'

let styles

export default class Holes extends Component {
  static propTypes = {
    onWhackCorrectHole: PropTypes.func.isRequired,
    isRunning: PropTypes.bool,
    hibernating: PropTypes.bool,
  }

  constructor() {
    super()
    this.onWhack = ::this.onWhack
    this.setNewMoleHole = ::this.setNewMoleHole
  }

  state = {
    moleInHole: null,
  }

  componentDidMount() {
    if (this.props.isRunning) {
      this.setNewMoleHole()
    }
  }

  componentWillUnmount() {
    clearTimeout(this.switchMoleHoleTimeout)
  }

  onWhack(holeNumber) {
    const correctHole = this.state.moleInHole === holeNumber

    if (correctHole) {
      this.props.onWhackCorrectHole()
      this.setNewMoleHole()
    }
  }

  setNewMoleHole() {
    const newMoleInHole = Math.floor(Math.random() * NUMBER_OF_HOLES)
    clearTimeout(this.switchMoleHoleTimeout)

    if (newMoleInHole === this.state.moleInHole) {
      return this.setNewMoleHole()
    }

    this.setState({
      moleInHole: newMoleInHole,
    })

    this.switchMoleHoleTimeout = setTimeout(
      this.setNewMoleHole,
      random(MIN_TIMER, MAX_TIMER)
    )
  }

  render() {
    const holes = times(NUMBER_OF_HOLES, nth => (
      <Hole
        key={nth}
        number={nth}
        hasMole={nth === this.state.moleInHole && this.props.isRunning}
        onWhack={this.onWhack}
        hibernating={this.props.hibernating}
      />
    ))

    return (
      <div className={styles.holes}>
        {holes}
      </div>
    )
  }
}

styles = StyleSheet.create({
  holes: {
    width: '100%',
    maxWidth: '30em',
    paddingBottom: '1em',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    userSelect: 'none',
  },
})
