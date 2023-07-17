import React from 'react'
import { generateExcelColumnHeader, limitDecimalPlaces } from '../utils'

/**
 * Cell represents the atomic element of a table
 */
const Cell = ({ x, y, value, gridCellType, excelGrid }) => {
  const calculateCss = () => {
    const css = {
      width: '100px',
      padding: '4px',
      margin: '0',
      height: '20px',
      boxSizing: 'border-box',
      position: 'relative',
      display: 'inline-block',
      color: 'black',
      textAlign: 'left',
      verticalAlign: 'top',
      fontSize: '12px',
      lineHeight: '15px',
      overflow: 'hidden',
    }
    css.border = '1px solid rgba(0, 0, 0, 0.1)'
    css.borderTop = '0px'
    css.borderLeft = '0px'

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

  if (y === 0 && excelGrid) {
    return (
      <span style={css} role='presentation'>
        {generateExcelColumnHeader(x - 1)}
      </span>
    )
  }

  return (
    <span style={css} role='presentation'>
      {value ? limitDecimalPlaces(value) : 0}
    </span>
  )
}

export default Cell
