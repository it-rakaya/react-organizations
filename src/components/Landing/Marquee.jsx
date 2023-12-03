import React from 'react'
import '../../App.css'
const Marquee = ({children}) => {
  return (
    <div className='marquee-container w-[100%] fixed left-0 bottom-0 bg-primary'>
        <div className='marquee-content'>
            {children}
        </div>
    </div>
  )
}

export default Marquee