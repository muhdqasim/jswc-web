import PropTypes from 'prop-types'
import React from 'react'

/**
 * Cell represents the atomic element of a table
 */
const Cell = ({ x, y, value }) => {
  const determineDisplay = (value) => {
    return value
  }

  let display = determineDisplay(value)

  const calculateCss = () => {
    const css = {
      width: '80px',
      padding: '4px',
      margin: '0',
      height: '25px',
      boxSizing: 'border-box',
      position: 'relative',
      display: 'inline-block',
      color: 'black',
      border: '1px solid #cacaca',
      textAlign: 'left',
      verticalAlign: 'top',
      fontSize: '14px',
      lineHeight: '15px',
      overflow: 'hidden',
    }

    return css
  }

  const css = calculateCss()

  return (
    <span style={css} role='presentation'>
      {display}
    </span>
  )
}

Cell.propTypes = {
  /**
   * Function called when the cell changes its value
   */

  /**
   * Function called when formula recalculation is needed
   */
  executeFormula: PropTypes.func.isRequired,

  /**
   * Function called when a cell is refreshed and requires
   * an update of the others
   */
  updateCells: PropTypes.func.isRequired,

  /**
   * The x coordinates of this cell
   */
  x: PropTypes.number.isRequired,

  /**
   * The y coordinates of this cell
   */
  y: PropTypes.number.isRequired,

  /**
   * The value of this cell
   */
  value: PropTypes.string.isRequired,
}

export default Cell
