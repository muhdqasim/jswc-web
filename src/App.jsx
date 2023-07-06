import { useEffect, useRef, useState } from 'react'
import './App.css'
import Table from './components/Table'

function App() {
  const [jsonData, setJsonData] = useState({})
  const jsonDataRef = useRef({})
  const [socket, setSocket] = useState()

  const returnStyles = (Properties, position, backgroundColor) => {
    const formStyle = {
      position,
      top: `${Properties?.Posn[0]}px`,
      left: `${Properties?.Posn[1]}px`,
      maxHeight: Properties?.Size[0],
      maxWidth: Properties?.Size[1],
      minHeight: Properties?.Size[0],
      minWidth: Properties?.Size[1],
      backgroundColor,
    }

    return formStyle
  }

  const handleSocketData = (data) => {
    if (data.ID.includes('.')) {
      const prefix = data.ID.split('.')[0]
      const updatedJsonData = { ...jsonDataRef.current[prefix] }
      const childrenExist = updatedJsonData.children.find(
        (singleChild) => singleChild.ID === data.ID
      )
      if (childrenExist) {
        updatedJsonData.children = updatedJsonData.children.map(
          (singleChild) => {
            if (singleChild.ID === data.ID) {
              return {
                ...singleChild,
                Properties: {
                  ...singleChild.Properties,
                  Values: data.Properties.Values[0],
                },
              }
            }
            return singleChild
          }
        )
      } else {
        updatedJsonData.children.push(data)
      }
      jsonDataRef.current = {
        ...jsonDataRef.current,
        [prefix]: updatedJsonData,
      }
    } else {
      jsonDataRef.current = {
        ...jsonDataRef.current,
        [data.ID]: { ...data, children: [] },
      }
    }
  }

  useEffect(() => {
    // Create a new WebSocket connection
    const socket = new WebSocket('ws://localhost:22322/')
    setSocket(socket)
    // WebSocket connection opened
    socket.onopen = () => {
      console.log('WebSocket connection opened')
      // Send initialization data to the WebSocket server
      socket.send('Initialise')
    }

    // WebSocket received a message
    socket.onmessage = (event) => {
      // console.log('WebSocket message received:', event.data)
      if (event.data.includes('WC')) {
        handleSocketData(JSON.parse(event.data).WC)
        console.log(JSON.parse(event.data).WC)
      } else {
        handleSocketData(JSON.parse(event.data).WS)
        console.log(JSON.parse(event.data).WS)
      }
      setJsonData(() => jsonDataRef.current)
      // Handle the received data here
      // Update your React component state, trigger actions, etc.
    }

    // Clean up the WebSocket connection on component unmount
    return () => {
      socket.close()
    }
  }, []) // Empty dependency array to ensure the effect runs only once

  const renderChildren = (singleChild) => {
    const { Properties } = singleChild
    if (Properties.Type === 'Edit') {
      const inputStyle = returnStyles(Properties, 'absolute', 'white')
      return (
        <input
          style={{ ...inputStyle, borderBottom: '1px solid' }}
          defaultValue={Properties.Text}
          onChange={(event) => {
            if (event.target.value !== '') {
              socket.send(
                JSON.stringify({
                  Event: {
                    EventName: Properties.Event[0],
                    ID: singleChild.ID,
                    Info: parseInt(event.target.value),
                  },
                })
              )
            }
          }}
          type={Properties.FieldType === 'numeric' ? 'number' : 'text'}
        />
      )
    } else if (Properties.Type === 'Combo') {
      const dropdownStyles = returnStyles(Properties, 'absolute', 'white')
      return (
        <select
          defaultValue={Properties.Text}
          style={dropdownStyles}
          onChange={(event) => {
            const index = Properties.Items.indexOf(event.target.value)
            socket.send(
              JSON.stringify({
                Event: {
                  EventName: Properties.Event[0],
                  ID: singleChild.ID,
                  Info: parseInt(index + 1),
                },
              })
            )
          }}
        >
          {Properties.Items.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </select>
      )
    } else if (Properties.Type === 'Button') {
      const buttonStyles = returnStyles(Properties, 'absolute', 'white')
      return (
        <button
          type='button'
          onClick={(event) => {
            event.preventDefault()
            socket.send(
              JSON.stringify({
                Event: { EventName: Properties.Event[0], ID: singleChild.ID },
              })
            )
          }}
          style={{ ...buttonStyles, border: '1px', borderRadius: '1px' }}
        >
          {Properties.Caption}
        </button>
      )
    } else if (Properties.Type === 'Grid') {
      const tableStyles = returnStyles(Properties, 'absolute', 'white')

      return (
        <div style={{ ...tableStyles, overflow: 'auto' }}>
          <Table
            x={parseInt(Properties.Values.length)}
            y={parseInt(Properties.Values.length)}
            id={singleChild.ID}
            data={[[], ...Properties.Values]}
          />
        </div>
      )
    }
  }

  const renderParent = (parent) => {
    const { Properties } = parent
    if (Properties.Type === 'Form') {
      const formStyles = returnStyles(Properties, 'relative', '#F0F0F0')
      return (
        <>
          <form style={formStyles}>
            <p style={{ position: 'absolute', translate: '0% -200%' }}>
              Function Table
            </p>
            {parent.children.map((singleChild) => {
              return renderChildren(singleChild)
            })}
          </form>
        </>
      )
    }
  }
  return (
    <>
      {Object.values(jsonData).map((parent) => {
        return renderParent(parent)
      })}
    </>
  )
}

export default App
