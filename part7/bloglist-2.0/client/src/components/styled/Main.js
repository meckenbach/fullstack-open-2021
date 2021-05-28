import styled from 'styled-components'
import Wrapper from './Wrapper'

const Main = styled(Wrapper)`
  & > * {
    grid-column: 2;
  }

  grid-gap: 2em;
`

export default Main
