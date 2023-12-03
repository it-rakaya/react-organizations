// ** Icon Imports
import { Icon } from '@iconify/react'

// eslint-disable-next-line react/prop-types
const IconifyIcon = ({ icon, ...rest }) => {
  return <Icon icon={icon} fontSize='1.5rem' {...rest} />
}


export default IconifyIcon
