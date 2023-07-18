import React from 'react'
import { generateExcelColumnHeader, limitDecimalPlaces } from '../utils'
import Dropdown from './Dropdown'
import Input from './Input'

/**
 * Cell represents the atomic element of a table
 */
const Cell = ({ x, y, value, gridCellType, excelGrid, showInput }) => {
  const calculateCss = () => {
    const css = {
      width: '125px',
      padding: '4px',
      margin: '0',
      height: '23px',
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

    if (x !== 0 && y !== 0 && excelGrid) {
      css.textAlign = 'right'
    }

    if (y === 0) {
      css.textAlign = 'center'
    }

    return css
  }

  const css = calculateCss()

  const renderInputComponent = () => {
    if (y === 0) {
      return value
    }
    if (gridCellType[x].Type === 'Edit') {
      return (
        <Input Properties={gridCellType[x]} value={value} editable={false} />
      )
    } else if (gridCellType[x].Type === 'Combo') {
      return (
        <Dropdown Properties={gridCellType[x]} value={value} editable={false} />
      )
    } else if (
      gridCellType[x].Type === 'Button' &&
      gridCellType[x].Style === 'Check'
    ) {
      return <input type='checkbox' checked={value === 1} />
    }
    return value
  }

  // column 0
  if (x === 0 && excelGrid) {
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
      {!excelGrid && showInput
        ? renderInputComponent()
        : value
        ? limitDecimalPlaces(value)
        : 0}
    </span>
  )
}

export default Cell
