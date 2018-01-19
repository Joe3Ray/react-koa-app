import { connect } from 'react-redux'
import Hello from 'com/hello'
import * as action from './action'

const mapStateToProps = state => {
  return {
    info: state.hello.get('info')
  }
}

export default connect(mapStateToProps, action)(Hello)
