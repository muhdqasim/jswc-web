import React from 'react'
import { returnStyles } from '../utils'

function Input({ Properties, value, id, socket, editable = true }) {
  console.log({ value, editable })
  const inputStyle = returnStyles(Properties, 'absolute', 'white', editable)
  return (
    <input
      style={{ ...inputStyle, borderBottom: '1px solid' }}
      defaultValue={value}
      onChange={(event) => {
        if (event.target.value !== '' && editable) {
          socket.send(
            JSON.stringify({
              Event: {
                EventName: Properties.Event[0],
                ID: id,
                Info: parseInt(event.target.value),
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
