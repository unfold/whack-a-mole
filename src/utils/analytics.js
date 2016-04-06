/* eslint-disable id-length */

const GOOGLE_ANALYTICS_ID = process.env.GOOGLE_ANALYTICS_ID
let initialized = false

function loadScript(url) {
  const scriptElement = document.createElement('script')
  const firstScript = document.getElementsByTagName('script')[0]

  scriptElement.src = url
  scriptElement.async = true
  firstScript.parentNode.insertBefore(scriptElement, firstScript)
}

function initialize() {
  if (initialized) {
    return
  }

  initialized = true

  // Google Analytics
  if (GOOGLE_ANALYTICS_ID) {
    loadScript('//www.google-analytics.com/analytics.js')

    window.GoogleAnalyticsObject = 'ga'

    if (!window.ga) {
      window.ga = function ga() {
        (window.ga.q = window.ga.q || []).push(arguments)
      }
    }

    // See: https://support.google.com/analytics/answer/1033867
    const fields = {
      anonymizeIp: true,
    }

    window.ga.l = +new Date()
    window.ga('create', GOOGLE_ANALYTICS_ID, { siteSpeedSampleRate: 100 })
    window.ga('set', fields)
  }
}

// Event
function track(event, properties = {}) {
  initialize()

  // Google Analytics
  if (GOOGLE_ANALYTICS_ID) {
    window.ga('send', {
      hitType: 'event',
      eventAction: event,
      eventCategory: properties.category || 'All',
      eventLabel: properties.label,
      eventValue: properties.value,
      nonInteraction: properties.interaction === false,
    })
  }
}

// Page view
function page(name) {
  initialize()
  const { protocol, hostname, pathname, search } = window.location

  // Google Analytics
  if (GOOGLE_ANALYTICS_ID) {
    window.ga('send', {
      hitType: 'pageview',
      location: `${protocol}//${hostname}${pathname}${search}`,
      title: name,
    })
  }
}

// Exception
function exception(error, properties = {}) {
  initialize()

  // Google Analytics
  if (GOOGLE_ANALYTICS_ID) {
    window.ga('send', {
      hitType: 'exception',
      exDescription: error,
      exFatal: properties.fatal,
    })
  }
}

export default {
  initialize,
  track,
  page,
  exception,
}
