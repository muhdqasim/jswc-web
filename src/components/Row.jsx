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
  showInput,
  Properties,
  id,
  socket,
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
        value={excelGrid ? rowData[colIndex - 1] || '' : rowData[colIndex]}
        executeFormula={executeFormula}
        gridCellType={gridCellType}
        excelGrid={excelGrid}
        showInput={showInput}
        Properties={Properties}
        id={id}
        socket={socket}
      />
    )
  }

  return <div>{cells}</div>
}

export default Row
