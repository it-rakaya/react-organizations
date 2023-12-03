import { Button } from '@mui/material'
import React, { useRef, useState } from 'react'
import SignaturePad from 'react-signature-canvas'

function Signature() {
  const [trimmedDataURL, setTrimmedDataURL] = useState(null)
  const sigPad = useRef(null)

  const clear = () => {
    sigPad.current.clear()
  }

  const trim = () => {
    setTrimmedDataURL(sigPad.current.getTrimmedCanvas().toDataURL('image/png'))
  }

  return (
    <div className={'  w-full p-5 rounded-2xl'}>
      <div className={'w-full flex '}>
        <SignaturePad canvasProps={{ className:'w-full h-full border'}} ref={sigPad} />
      </div>
      <div className='flex justify-between my-3'>
        <Button className={''} variant='outlined' onClick={clear}>
          Clear
        </Button>
        <Button className={''} variant='outlined' onClick={trim}>
          preview
        </Button>
      </div>
      <div className='border'>

      {trimmedDataURL ? <img className={''} src={trimmedDataURL} alt='Signature' /> : null}
      </div>
    </div>
  )
}

export default Signature
