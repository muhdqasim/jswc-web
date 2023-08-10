import { useEffect, useRef, useState } from 'react'
import './App.css'
import Dropdown from './components/Dropdown'
import Input from './components/Input'
import Table from './components/Table'
import MenuBar from './components/menu-bar'
import TreeView from './components/tree-view'
import { checkCharacterOccurrences, returnStyles } from './utils'

function App() {
  const [jsonData, setJsonData] = useState({})
  const jsonDataRef = useRef({})
  const [socket, setSocket] = useState()
  const [gridCellType, setGridCellTypes] = useState([])

  const handleSocketData = (data) => {
    if (
      checkCharacterOccurrences(data.ID, '.') &&
      data.Properties.Type &&
      data.Properties.Type !== 'Menu'
    ) {
      setGridCellTypes((prevValue) => {
        return [...prevValue, data.Properties]
      })
      return
    }
    if (data.ID.includes('.')) {
      const prefix = data.ID.split('.')[0]
      const updatedJsonData = { ...jsonDataRef.current[prefix] }

      if (data.Properties.Type && data.Properties.Type === 'Menu') {
        const childrenExist = updatedJsonData.children.find((singleChild) => {
          return singleChild.Properties.Type[0] === 'MenuBar'
        })

        if (childrenExist) {
          updatedJsonData.children = updatedJsonData.children.map(
            (singleChild) => {
              if (singleChild.Properties.Type[0] === 'MenuBar') {
                const menuItems = singleChild.Properties.Menu || []
                menuItems.push(data)

                return {
                  ...singleChild,
                  Properties: {
                    ...singleChild.Properties,
                    Menu: menuItems,
                  },
                }
              }
            }
          )
        }
        jsonDataRef.current = {
          ...jsonDataRef.current,
          [prefix]: updatedJsonData,
        }
        return
      }

      if (data.Properties.Type && data.Properties.Type === 'MenuItem') {
        updatedJsonData.children = updatedJsonData.children.map(
          (singleChild) => {
            if (singleChild.Properties.Type[0] === 'MenuBar') {
              return {
                ...singleChild,
                Properties: {
                  ...singleChild.Properties,
                  Menu: singleChild.Properties.Menu.map((singleMenu) => {
                    const dataSplitted = data.ID.split('.')[2]
                    const childSplitted = singleMenu.ID.split('.')[2]
                    if (dataSplitted === childSplitted) {
                      return {
                        ...singleMenu,
                        Dropdown: [...(singleMenu.Dropdown || []), data],
                      }
                    } else {
                      return singleMenu
                    }
                  }),
                },
              }
            } else {
              return singleChild
            }
          }
        )
        jsonDataRef.current = {
          ...jsonDataRef.current,
          [prefix]: updatedJsonData,
        }
        return
      }

      const childrenExist = updatedJsonData.children.find((singleChild) => {
        return singleChild.ID === data.ID
      })

      if (childrenExist) {
        updatedJsonData.children = updatedJsonData.children.map(
          (singleChild) => {
            if (singleChild.ID === data.ID) {
              // Check if 'Values' exists in data.Properties
              if (data.Properties.Values) {
                return {
                  ...singleChild,
                  Properties: {
                    ...singleChild.Properties,
                    Values: data.Properties.Values,
                  },
                }
              }
              // Check if 'Captions' exists in data.Properties
              else if (data.Properties.Caption) {
                return {
                  ...singleChild,
                  Properties: {
                    ...singleChild.Properties,
                    Caption: data.Properties.Caption,
                  },
                }
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

  console.log({ jsonDataRef })

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
      if (event.data.includes('WC')) {
        console.log('in wc')
        handleSocketData(JSON.parse(event.data).WC)
        console.log(JSON.parse(event.data).WC)
      } else if (event.data.includes('WG')) {
        console.log('in wg')
        handleSocketData(JSON.parse(event.data).WG)
        console.log(JSON.parse(event.data).WG)
      } else {
        console.log('in ws')
        handleSocketData(JSON.parse(event.data).WS)
        console.log(JSON.parse(event.data).WS)
      }
      setJsonData(() => jsonDataRef.current)
    }

    // Clean up the WebSocket connection on component unmount
    return () => {
      socket.close()
    }
  }, []) // Empty dependency array to ensure the effect runs only once

  const renderChildren = (singleChild) => {
    const { Properties } = singleChild

    if (Properties.Type[0] === 'MenuBar') {
      return (
        <div
          style={{
            position: 'absolute',
            translate: '0% -100%',
            zIndex: '99999',
          }}
        >
          <MenuBar menuData={Properties.Menu} />
        </div>
      )
    }
    if (Properties.Type === 'Edit') {
      return (
        <Input
          Properties={Properties}
          value={Properties.Text}
          id={singleChild.ID}
          socket={socket}
        />
      )
    } else if (Properties.Type === 'Label') {
      const labelStyles = returnStyles(Properties, 'absolute', '#F0F0F0')
      return <label style={{ ...labelStyles }}>{Properties.Caption}</label>
    } else if (Properties.Type === 'TreeView') {
      const treeStyle = returnStyles(Properties, 'absolute', 'white')
      const { Depth, Items } = Properties
      const treeData = []

      let parentIndex = -1
      for (let i = 0; i < Depth.length; i++) {
        const depthValue = Depth[i]
        const label = Items[i]

        if (depthValue === 0) {
          parentIndex++
          treeData.push({
            id: parentIndex + 1,
            label,
            children: [],
          })
        } else if (depthValue === 1) {
          treeData[parentIndex].children.push({
            id: parentIndex * 10 + treeData[parentIndex].children.length + 1,
            label,
          })
        }
      }

      return (
        <div style={{ ...treeStyle, border: '1px solid black' }}>
          <TreeView data={treeData} />
        </div>
      )
    } else if (Properties.Type === 'Combo') {
      return (
        <Dropdown
          Properties={Properties}
          value={Properties.Text}
          id={singleChild.ID}
          socket={socket}
        />
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
    } else if (Properties.Type === 'Grid' && !Properties.ColTitles) {
      const tableStyles = returnStyles(Properties, 'absolute', 'white')

      return (
        <div
          style={{
            ...tableStyles,
            overflow: 'auto',
            border: '1px solid black',
          }}
        >
          <Table
            x={parseInt(Properties.Values.length)}
            y={parseInt(Properties.Values.length)}
            id={singleChild.ID}
            data={[[], ...Properties.Values]}
          />
        </div>
      )
    } else if (
      Properties.Type === 'Grid' &&
      Properties.ColTitles &&
      Properties.Values
    ) {
      const tableStyles = returnStyles(Properties, 'absolute', 'white')
      return (
        <div
          style={{
            ...tableStyles,
            overflow: 'auto',
            border: '1px solid black',
          }}
        >
          <Table
            x={parseInt(Properties.ColTitles.length)}
            y={parseInt(Properties.Values.length)}
            id={singleChild.ID}
            data={[Properties.ColTitles, ...Properties.Values]}
            gridCellType={gridCellType}
            excelGrid={false}
            showInput={Properties.ShowInput === 1}
            Properties={Properties}
            socket={socket}
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
            <p style={{ position: 'absolute', translate: '0% -300%' }}>
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
