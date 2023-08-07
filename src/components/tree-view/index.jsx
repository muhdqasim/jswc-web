// TreeView.js
import React from 'react'
import TreeNode from './TreeNode'

const TreeView = ({ data }) => {
  const renderTreeNodes = (nodes) => {
    return nodes.map((node) => (
      <TreeNode
        key={node.id}
        label={node.label}
        children={node.children || []}
      />
    ))
  }

  return <>{renderTreeNodes(data)}</>
}

export default TreeView
