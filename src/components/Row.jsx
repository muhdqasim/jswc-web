import React from 'react'
import Cell from './Cell'

/**
 * Row manages a single row of the table
 */
const Row = ({
  handleChangedCell,
  executeFormula,
  updateCells,
  x,
  y,
  rowData,
  gridCellType,
  excelGrid,
}) => {
  const cells = []

  for (let colIndex = 0; colIndex < x; colIndex += 1) {
    cells.push(
      <Cell
        key={`${colIndex}-${y}`}
        y={y}
        x={colIndex}
        onChangedValue={handleChangedCell}
        updateCells={updateCells}
        value={rowData[colIndex - 1] || ''}
        executeFormula={executeFormula}
        gridCellType={gridCellType}
        excelGrid={excelGrid}
      />
    )
  }

  return <div>{cells}</div>
}

export default Row
