import React from 'react'
import PureComponent from 'react-pure-render/component'

function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component'
}

function getComponentRequiredProps({ propTypes }) {
  return Object.keys(propTypes).filter(key => !propTypes[key].isRequired)
}

export default function (loader = null, ownRequiredProps) {
  return WrappedComponent => {
    const requiredProps = ownRequiredProps || getComponentRequiredProps(WrappedComponent)

    class Loader extends PureComponent {
      render() {
        const loaded = requiredProps.every(key => this.props[key])

        if (!loaded) {
          return !loader || React.isValidElement(loader) ? loader : loader(this.props)
        }

        return (
          <WrappedComponent {...this.props} />
        )
      }
    }

    Loader.displayName = `Loader(${getDisplayName(WrappedComponent)})`
    Loader.WrappedComponent = WrappedComponent

    return Loader
  }
}
