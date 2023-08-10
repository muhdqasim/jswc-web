import React, { useState } from 'react'

function Dropdown({ dropdownData, socket }) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)

  const handleDropdownToggle = () => {
    setIsDropdownVisible(!isDropdownVisible)
  }
  return (
    <div
      className='menu-item'
      onMouseEnter={handleDropdownToggle}
      onMouseLeave={handleDropdownToggle}
    >
      {dropdownData.Properties.Caption.substring(1)}
      {isDropdownVisible && (
        <div className='dropdown' style={{ width: '60%' }}>
          {dropdownData.Dropdown.map((dropdownValue) => {
            return (
              <div
                onClick={() => {
                  console.log(
                    JSON.stringify({
                      Event: {
                        EventName: dropdownValue.Properties.Event[0],
                        ID: dropdownValue.ID,
                      },
                    })
                  )
                  socket.send(
                    JSON.stringify({
                      Event: {
                        EventName: dropdownValue.Properties.Event[0],
                        ID: dropdownValue.ID,
                      },
                    })
                  )
                  handleDropdownToggle()
                }}
                id={dropdownValue.ID}
                className='dropdown-item'
              >
                {dropdownValue.Properties.Caption.substring(1)}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Dropdown
