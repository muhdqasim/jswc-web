// TreeNode.js
import React, { useState } from 'react'

const TreeNode = ({ label, children, isChild = false }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleToggle = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <span>
        <button
          onClick={(event) => {
            event.preventDefault()
            handleToggle()
          }}
        >
          {isExpanded || isChild ? '-' : '+'}
        </button>
        {label}
      </span>
      {isExpanded && children && children.length > 0 && (
        <div style={{ marginLeft: '20px' }}>
          {children.map((child) => (
            <TreeNode
              key={child.id}
              label={`${child.label}`}
              children={[]}
              isChild={true}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default TreeNode
