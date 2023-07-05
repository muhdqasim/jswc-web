import { Parser as FormulaParser } from 'hot-formula-parser'
import PropTypes from 'prop-types'
import React from 'react'
import Row from './Row'

const Table = ({ x, y, data }) => {
  const parser = new FormulaParser()

  parser.on('callCellValue', (cellCoord, done) => {
    const cellX = cellCoord.column.index + 1
    const cellY = cellCoord.row.index + 1

    if (cellX > x || cellY > y) {
      throw parser.Error(parser.ERROR_NOT_AVAILABLE)
    }

    if (parser.cell.x === cellX && parser.cell.y === cellY) {
      throw parser.Error(parser.ERROR_REF)
    }

    if (!data[cellY] || !data[cellY][cellX]) {
      return done('')
    }

    return done(data[cellY][cellX])
  })

  parser.on('callRangeValue', (startCellCoord, endCellCoord, done) => {
    const startCellX = startCellCoord.column.index + 1
    const startCellY = startCellCoord.row.index + 1
    const endCellX = endCellCoord.column.index + 1
    const endCellY = endCellCoord.row.index + 1
    const fragment = []

    for (let cellY = startCellY; cellY <= endCellY; cellY += 1) {
      const row = data[cellY]
      if (!row) {
        continue
      }

      const colFragment = []

      for (let cellX = startCellX; cellX <= endCellX; cellX += 1) {
        let value = row[cellX]
        if (!value) {
          value = ''
        }

        if (value.slice(0, 1) === '=') {
          const res = executeFormula({ x: cellX, y: cellY }, value.slice(1))
          if (res.error) {
            throw parser.Error(res.error)
          }
          value = res.result
        }

        colFragment.push(value)
      }
      fragment.push(colFragment)
    }

    if (fragment) {
      done(fragment)
    }
  })

  const rows = []

  console.log(data, 'data')

  for (let rowIndex = 0; rowIndex < y + 1; rowIndex += 1) {
    const rowData = data[rowIndex] || {}

    console.log({ y: rowIndex, x: x + 1, rowData })
    rows.push(<Row key={rowIndex} y={rowIndex} x={x + 1} rowData={rowData} />)
  }

  return <div style={{ width: 'max-content' }}>{rows}</div>
}

Table.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  id: PropTypes.string,
  saveToLocalStorage: PropTypes.bool,
}

Table.defaultProps = {
  saveToLocalStorage: true,
  id: 'default',
}

export default Table
