import React from 'react'

import './index.scss'

function Btn({ isActive, handleClick, children, className }) {
  return (
    <button 
      className={`${className} simple-btn ${isActive ? 'active': ''}`}
      onClick={handleClick}
    >
      {children}
    </button>
  )
}

export {
  Btn
}
