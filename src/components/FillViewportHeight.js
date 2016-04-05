import { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

export default class FillViewportHeight extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  componentDidMount() {
    this.applyViewportHeight()
    window.addEventListener('resize', this.applyViewportHeight)
  }

  componentDidUpdate() {
    this.applyViewportHeight()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.applyViewportHeight)
  }

  applyViewportHeight() {
    const node = ReactDOM.findDOMNode(this)

    if (node) {
      node.style['min-height'] = `${window.innerHeight - node.offsetTop}px`
    }
  }

  applyViewportHeight = ::this.applyViewportHeight

  render() {
    return this.props.children
  }
}
