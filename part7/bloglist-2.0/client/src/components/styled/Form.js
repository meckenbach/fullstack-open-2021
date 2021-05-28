import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

// /* CSS HEX */
// --metallic-seaweed: #177e89ff;
// --midnight-green-eagle-green: #084c61ff;
// --cg-red: #db3a34ff;
// --maximum-yellow-red: #ffc857ff;
// --jet: #323031ff;

const Form = ({ children, legend,  ...props }) => {
  return (
    <Wrapper {...props}>
      <Fieldset>
        <Legend>{legend}</Legend>
        {children}
      </Fieldset>
    </Wrapper>
  )
}

const Wrapper = styled.form`
  width: 100%;
`

const Fieldset = styled.fieldset`
    padding: 1em 2em;
    border: 1px solid var(--color-gray-300);
`

const Legend = styled.legend`
    background-color: var(--jet);
    padding: 5px 30px;
    border: none;
    color: white;
`
Form.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  legend: PropTypes.string.isRequired
}

export default Form
