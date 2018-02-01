import React, { Component } from 'react'
import { connect } from 'react-redux'

class App extends Component {
  render () {
    return (
      <div>app</div>
    )
  }
}

const mapStateToProps = state => {
  return {
    state
  }
}

export default connect(mapStateToProps)(App)
