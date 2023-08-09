import React, { useState } from 'react'
import './MenuBar.css'

const MenuBar = ({ menuData }) => {
  console.log({ menuData })
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)

  const handleDropdownToggle = () => {
    setIsDropdownVisible(!isDropdownVisible)
  }

  return (
    <div className='menu-bar'>
      {menuData?.map((singleMenu) => {
        return (
          <div className='menu-item'>
            {singleMenu.Properties.Caption.substring(1)}
          </div>
        )
      })}

      <div
        className='menu-item'
        onMouseEnter={handleDropdownToggle}
        onMouseLeave={handleDropdownToggle}
      >
        Dropdown
        {isDropdownVisible && (
          <div className='dropdown'>
            <div className='dropdown-item'>Option 1</div>
            <div className='dropdown-item'>Option 2</div>
            <div className='dropdown-item'>Option 3</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MenuBar
