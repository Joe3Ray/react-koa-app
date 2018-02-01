import { Component } from 'react'
import PropTypes from 'prop-types'
import NProgress from 'nprogress'

export default class Bundle extends Component {
  static propTypes = {
    load: PropTypes.func.isRequired,
    children: PropTypes.func.isRequired
  }

  state = {mod: null}

  componentWillMount () {
    this.load(this.props)
    NProgress.start()
  }

  componentDidMount () {
    NProgress.done()
    this._isMounted = true
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps)
    }
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  async load (props) {
    this.setState({mod: null})

    const module = await props.load()

    if (this._isMounted) {
      this.setState({mod: module.default || module})
    }
  }

  render () {
    return this.state.mod ? this.props.children(this.state.mod) : null
  }
}
