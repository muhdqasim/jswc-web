import React, { useState } from 'react'
import './MenuBar.css'

const MenuBar = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)

  const handleDropdownToggle = () => {
    setIsDropdownVisible(!isDropdownVisible)
  }

  return (
    <div className='menu-bar'>
      <div className='menu-item'>Home</div>
      <div className='menu-item'>About</div>
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
      <div className='menu-item'>Contact</div>
    </div>
  )
}

export default MenuBar
