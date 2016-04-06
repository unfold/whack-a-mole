import React from 'react'
import { StyleSheet } from 'react-look'

let styles

export default props => (
  <header {...props} className={styles.header} />
)

styles = StyleSheet.create({
  header: {
    borderBottom: '1px solid #E1E1E1',
    padding: '1em',
    textAlign: 'center',
    fontSize: '1.4em',
    lineHeight: 1,
    letterSpacing: '0.95px',
  },
})
