import styled from 'styled-components'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns:
    1fr
    min(65ch, 100%)
    1fr;

  & .full-bleed {
    width: 100%;
    grid-column: 1 / -1;
  }
`

export default Wrapper
