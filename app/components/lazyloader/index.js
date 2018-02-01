import React from 'react'
import Bundle from '../bundle'

export default path => {
  return props => (
    // https://webpack.js.org/guides/code-splitting/#dynamic-imports
    <Bundle
      load={() =>
        import(/* webpackChunkName: "route-[request]" */ `../../containers/${path}/index.js`)
      }
    >
      {LazyComponent => <LazyComponent {...props} />}
    </Bundle>
  )
}
