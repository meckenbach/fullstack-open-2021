import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

import Button from './styled/Button'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => ({ toggleVisibility }))

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const center = {
    display: 'flex',
    justifyContent: 'center'
  }

  return (
    <div style={center}>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {visible ? props.children : null}
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
}

export default Togglable
