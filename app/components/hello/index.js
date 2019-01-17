import React from 'react'
import PropTypes from 'prop-types'

import avatar from './imgs/avatar.png'

import './index.less'

export default class Hello extends React.Component {
  static propTypes = {
    info: PropTypes.string.isRequired,
    fetchUserInfo: PropTypes.func.isRequired
  }

  componentDidMount () {
    this.props.fetchUserInfo()
  }

  render () {
    return (
      <div className='hello'>
        <p>You: Hello, I am Front-end!</p>
        <p>Backend: {this.props.info}</p>
        <img src={avatar} />
      </div>
    )
  }
}
