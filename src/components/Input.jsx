import React from 'react'
import { isNumeric, returnStyles } from '../utils'

function Input({
  Properties,
  value,
  id,
  socket,
  editable = true,
  tableInput = false,
  row,
  col,
}) {
  const inputStyle = returnStyles(Properties, 'absolute', 'white', editable)
  return (
    <input
      style={{ ...inputStyle, borderBottom: editable ? '1px solid' : '' }}
      defaultValue={value}
      onChange={(event) => {
        if (event.target.value !== '' && !tableInput) {
          console.log(
            JSON.stringify({
              Event: {
                EventName: Properties.Event[0],
                ID: id,
                Info: parseInt(event.target.value),
              },
            })
          )
          socket.send(
            JSON.stringify({
              Event: {
                EventName: Properties.Event[0],
                ID: id,
                Info: parseInt(event.target.value),
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
                Value: isNumeric(event.target.value)
                  ? +event.target.value
                  : event.target.value,
              },
            })
          )
        }
      }}
      type={Properties?.FieldType === 'numeric' ? 'number' : 'text'}
    />
  )
}

export default Input
