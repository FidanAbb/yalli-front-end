import React from 'react'

const JoinGroupIcon = ({isHover}) => {
  return (
    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 12.5L12 4.5M12 4.5H6M12 4.5V10.5" stroke={isHover ? "white" : "#fa4500"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    
  )
}

export default JoinGroupIcon