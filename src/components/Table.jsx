import React from 'react'
import Row from './Row'

const Table = ({
  x,
  y,
  data,
  gridCellType,
  excelGrid = true,
  showInput = false,
}) => {
  const rows = []

  for (let rowIndex = 0; rowIndex < y + 1; rowIndex += 1) {
    const rowData = data[rowIndex] || {}

    rows.push(
      <Row
        key={rowIndex}
        y={rowIndex}
        x={excelGrid ? x + 1 : x}
        rowData={rowData}
        gridCellType={gridCellType}
        excelGrid={excelGrid}
        showInput={showInput}
      />
    )
  }

  return <div style={{ width: 'max-content' }}>{rows}</div>
}

export default Table
