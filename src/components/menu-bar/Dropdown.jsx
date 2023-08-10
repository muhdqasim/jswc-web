import React, { useState } from 'react'

function Dropdown({ dropdownData }) {
  console.log({ dropdownData })
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
      {true && (
        <div className='dropdown' style={{ width: '60%' }}>
          {dropdownData.Dropdown.map((dropdownValue) => {
            return (
              <div id={dropdownValue.ID} className='dropdown-item'>
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
