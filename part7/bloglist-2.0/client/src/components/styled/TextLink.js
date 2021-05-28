import styled from 'styled-components'

const TextLink = styled.a`
  color: var(--color-primary);
  font-weight: var(--font-weight-medium);
  text-decoration: none;
  &:hover {
    text-decoration: underline;
    text-decoration-thickness: 15%;
  }
`

export default TextLink
