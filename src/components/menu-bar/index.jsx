import React from 'react'
import Dropdown from './Dropdown'
import './MenuBar.css'

const MenuBar = ({ menuData, socket }) => {
  return (
    <div className='menu-bar'>
      {menuData?.map((singleMenu) => {
        return (
          <>
            <div className='menu-item'>
              {singleMenu.Dropdown && singleMenu.Dropdown.length ? (
                <Dropdown dropdownData={singleMenu} socket={socket} />
              ) : (
                singleMenu.Properties.Caption.substring(1)
              )}
            </div>
          </>
        )
      })}
    </div>
  )
}

export default MenuBar
