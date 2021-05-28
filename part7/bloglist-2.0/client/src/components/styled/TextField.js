import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const TextField = ({ label, ...props }) => {
  return (
    <>
      <Label htmlFor={label}>{label}</Label>
      <Wrapper id={label} {...props} />
    </>
  )
}

TextField.propTypes = {
  label: PropTypes.string.isRequired
}

const Wrapper = styled.input`
  width: 100%;
  height: 2em;
  border: 1px solid var(--color-gray-200);
  margin-bottom: 1em;
  padding-top: 1em;
  padding-left: 8px;
`

const Label = styled.label`
  position: absolute;
  font-size: 12px;
  font-variant: small-caps;
  color: gray;
  padding-left: 8px;
`

export default TextField
