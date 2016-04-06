import React from 'react'
import { StyleSheet } from 'react-look'

let styles

export default props => (
  <header {...props} className={styles.header} />
)

styles = StyleSheet.create({
  header: {
    borderBottom: '1px solid #E1E1E1',
    padding: '.8em',
    textAlign: 'center',
    fontWeight: 700,
    color: '#FD0042',
    fontSize: '1.6em',
    lineHeight: 1,
    letterSpacing: '0.95px',
  },
})
