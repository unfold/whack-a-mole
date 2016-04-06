import React, { Component, PropTypes } from 'react'
import { StyleSheet } from 'react-look'
import AvatarIcon from './AvatarIcon'
import orderBy from 'lodash/orderBy'
import map from 'lodash/map'
import { GOAL } from '../constants'
import randomcolor from 'randomcolor'
import cssEase from 'css-ease'

let styles

export default class ScoreboardList extends Component {
  static propTypes = {
    participants: PropTypes.object.isRequired,
  }

  render() {
    const { participants } = this.props
    const orderedParticipants = orderBy(map(participants, (participant, key) => ({
      id: key,
      ...participant,
    })), 'score', 'desc')

    const items = orderedParticipants.map(participant => (
      <div className={styles.item} key={participant.id}>
        <AvatarIcon className={styles.avatar} id={participant.avatar} />
        <div className={styles.score}>{participant.score}</div>
        <div className={styles.progressContainer}>
          <div
            data-seed={participant.id}
            className={styles.progress}
            style={{
              width: `${participant.score / GOAL * 100}%`,
              backgroundColor: randomcolor({
                seed: participant.id,
              }),
            }}
          />
        </div>
      </div>
    ))

    return (
      <div className={styles.list}>
        {items}
      </div>
    )
  }
}

styles = StyleSheet.create({
  list: {
    margin: '.5em 2em .5em 1em',
  },

  item: {
    display: 'flex',
    alignItems: 'center',
    padding: '.4em 0',
  },

  avatar: {
    width: '2.8em',
    height: '2.8em',
  },

  score: {
    width: '3em',
    textAlign: 'center',
  },

  progressContainer: {
    flexGrow: 1,
  },

  progress: {
    background: '#333',
    height: '.7em',
    borderRadius: '6px',
    transition: `width .4s ${cssEase['ease-out-expo']}`,
  },
})
