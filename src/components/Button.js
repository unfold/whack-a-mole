import React from 'react'
import classnames from 'classnames'
import { StyleSheet } from 'react-look'

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    borderRadius: '2em',
    color: '#FD0042',
    fontSize: '1.2em',
    padding: '.6em 1.4em .7em',
    border: '1px solid #FD0042',
  },
})

const Button = props => (
  <button
    type="button"
    {...props}
    className={classnames(styles.button, props.className)}
  />
)

Button.propTypes = {
  className: React.PropTypes.string,
}

export default Button
