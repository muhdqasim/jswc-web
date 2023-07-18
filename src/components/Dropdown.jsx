import React from 'react'
import { returnStyles } from '../utils'

function Dropdown({ Properties, value, id, socket, editable = true }) {
  const dropdownStyles = returnStyles(Properties, 'absolute', 'white', editable)
  return (
    <select
      defaultValue={value}
      style={dropdownStyles}
      onChange={(event) => {
        if (editable) {
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
