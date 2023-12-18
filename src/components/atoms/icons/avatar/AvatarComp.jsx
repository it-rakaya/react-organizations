/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef } from 'react'
import MuiAvatar from '@mui/material/Avatar'
import { lighten, useTheme } from '@mui/material/styles'
import UseBgColor from '../../../../hooks/useBgColor'



const AvatarComp = forwardRef((props, ref) => {
  const { sx, src, skin, color , className } = props

  const theme = useTheme()
  const bgColors = UseBgColor()

  const getAvatarStyles = (skin, skinColor) => {
    let avatarStyles
    if (skin === 'light') {
      avatarStyles = { ...bgColors[`${skinColor}Light`] }
    } else if (skin === 'light-static') {
      avatarStyles = {
        color: bgColors[`${skinColor}Light`].color,
        backgroundColor: lighten(theme.palette[skinColor].main, 0.88)
      }
    } else {
      avatarStyles = { ...bgColors[`${skinColor}Filled`] }
    }

    return avatarStyles
  }

  const colors = {
    primary: getAvatarStyles(skin, 'primary'),
    secondary: getAvatarStyles(skin, 'secondary'),
    success: getAvatarStyles(skin, 'success'),
    error: getAvatarStyles(skin, 'error'),
    warning: getAvatarStyles(skin, 'warning'),
    info: getAvatarStyles(skin, 'info')
  }

  return <MuiAvatar ref={ref} {...props} sx={!src && skin && color ? Object.assign(colors[color], sx) : sx}  className={className}/>
})
AvatarComp.defaultProps = {
  skin: 'filled',
  color: 'primary'
}

export default AvatarComp
