import React from 'react'
import '../../App.css'
const Marquee = ({children}) => {
  return (
    <div className='marquee-container w-[100%] absolute left-0 bottom-8'>
        <div className='marquee-content'>
            {children}
        </div>
    </div>
  )
}

export default Marquee