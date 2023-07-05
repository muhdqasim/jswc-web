import PropTypes from 'prop-types'
import React from 'react'

/**
 * Cell represents the atomic element of a table
 */
const Cell = ({ x, y, value }) => {
  const calculateCss = () => {
    const css = {
      width: '126px',
      padding: '4px',
      margin: '0',
      height: '20px',
      boxSizing: 'border-box',
      position: 'relative',
      display: 'inline-block',
      color: 'black',
      border: '1px solid  rgba(0, 0, 0, 0.1)',
      textAlign: 'left',
      verticalAlign: 'top',
      fontSize: '12px',
      lineHeight: '15px',
      overflow: 'hidden',
    }
    css.borderTop = '0px'
    css.borderLeft = '0px'

    if (x === 0 && y === 0) {
      //  css.position = 'sticky'
    }
    if (x !== 0 && y !== 0) {
      css.textAlign = 'right'
    }

    if (y === 0) {
      css.textAlign = 'center'
    }

    return css
  }

  const css = calculateCss()

  // column 0
  if (x === 0) {
    return <span style={css}>{y === 0 ? '' : y}</span>
  }

  function generateExcelColumnHeader(index) {
    let header = ''
    while (index >= 0) {
      header = String.fromCharCode(65 + (index % 26)) + header
      index = Math.floor(index / 26) - 1
    }
    return header
  }

  if (y === 0) {
    return (
      <span style={css} role='presentation'>
        {generateExcelColumnHeader(x - 1)}
      </span>
    )
  }

  return (
    <span style={css} role='presentation'>
      {value}
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
