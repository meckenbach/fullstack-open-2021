import React from 'react'
import styled from 'styled-components'

// From: https://www.joshwcomeau.com/animation/3d-button/

// eslint-disable-next-line react/prop-types
const Button = ({ children, ...props }) => {
  return (
    <Pushable {...props}>
      <Front>{children}</Front>
    </Pushable>
  )
}

const Front = styled.span`
  display: block;
  padding: 12px 42px;
  border-radius: 12px;
  font-size: 1.25rem;
  background: hsl(345deg 100% 47%);
  color: white;
  transform: translateY(-4px);

  will-change: transform;
  transition: transform 250ms;
`

const Pushable = styled.button`
  background: hsl(340deg 100% 32%);
  border-radius: 12px;
  border: none;
  padding: 0;
  cursor: pointer;
  outline-offset: 4px;
  font-variant: small-caps;
  margin-right: 5px;

  &:hover ${Front} {
    transform: translateY(-6px);
  }

  &:active ${Front} {
    transform: translateY(-2px);
  }
`

export default Button
