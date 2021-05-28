import styled from 'styled-components'

const NavLink = styled.a.attrs(({ to }) => ({
  href: to
}))`
  display: block;
  font-size: 1.2em;
  color: white;
  text-decoration: none;
  padding: 14px 16px;
  font-variant: small-caps;

  &:hover {
    background-color: var(--midnight-green-eagle-green)
  }
`

export default NavLink
