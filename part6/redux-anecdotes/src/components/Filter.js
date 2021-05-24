import React from 'react'
import { connect } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'
import PropTypes from 'prop-types'

const Filter = (props) => {
  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    const filter = event.target.value

    props.filterChange(filter)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

Filter.propTypes = {
  filterChange: PropTypes.oneOfType([PropTypes.function, PropTypes.any])
}

const ConnectedFilter= connect(
  null,
  { filterChange }
)(Filter)

export default ConnectedFilter