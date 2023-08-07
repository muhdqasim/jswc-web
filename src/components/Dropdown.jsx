import React from 'react'
import { returnStyles } from '../utils'

function Dropdown({
  Properties,
  value,
  id,
  socket,
  editable = true,
  tableInput = false,
  row,
  col,
}) {
  const dropdownStyles = returnStyles(Properties, 'absolute', 'white', editable)
  return (
    <select
      defaultValue={value}
      style={dropdownStyles}
      onChange={(event) => {
        if (!tableInput) {
          const index = Properties.Items.indexOf(event.target.value)
          socket.send(
            JSON.stringify({
              Event: {
                EventName: Properties.Event[0],
                ID: id,
                Info: parseInt(index + 1),
              },
            })
          )
        } else {
          console.log(
            JSON.stringify({
              Event: {
                EventName: Properties.Event[0],
                ID: id,
                Row: row,
                Col: col,
                Value: event.target.value,
              },
            })
          )

          socket.send(
            JSON.stringify({
              Event: {
                EventName: Properties.Event[0],
                ID: id,
                Row: row,
                Col: col,
                Value: event.target.value,
              },
            })
          )
        }
      }}
    >
      {Properties.Items.map((item, index) => (
        <option value={item} key={index}>
          {item}
        </option>
      ))}
    </select>
  )
}

export default Dropdown
