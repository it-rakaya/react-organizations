/* eslint-disable react/prop-types */
// ** React Imports
import { useState } from 'react'

// ** Next Import

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import { Link } from 'react-router-dom'
import { useSettings } from '../../../../hooks/useSettings'
import IconifyIcon from '../../../atoms/icons/IconifyIcon'

// ** Icon Imports

// ** Hook Import

const MenuItemWrapper = ({ children, option }) => {
  if (option.href) {
    return (
      <Box
        component={Link}
        href={option.href}
        {...option.linkProps}
        sx={{
          px: 4,
          py: 1.5,
          width: '100%',
          display: 'flex',
          color: 'inherit',
          alignItems: 'center',
          textDecoration: 'none'
        }}
      >
        {children}
      </Box>
    )
  } else {
    return <>{children}</>
  }
}

const OptionsMenu = props => {
  // ** Props
  const { icon, options, menuProps, iconProps, leftAlignMenu, iconButtonProps } = props

  // ** State
  const [anchorEl, setAnchorEl] = useState(null)

  // ** Hook & Var
  const { settings } = useSettings()
  const { direction } = settings

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton aria-haspopup='true' name='element' aria-label="Toggle dark mode"  onClick={handleClick} {...iconButtonProps}>
        {icon ? icon : <IconifyIcon icon='mdi:dots-vertical' {...iconProps} />}
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        onClose={handleClose}
        open={Boolean(anchorEl)}
        {...(!leftAlignMenu && {
          anchorOrigin: { vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' },
          transformOrigin: { vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }
        })}
        {...menuProps}
      >
        {options?.map((option, index) => {
          if (typeof option === 'string') {
            return (
              <MenuItem key={index} onClick={handleClose}  className="!text-black dark:!text-white">
                {option}
              </MenuItem>
            )
          } else if ('divider' in option) {
            return option.divider && <Divider key={index} {...option.dividerProps} />
          } else {
            return (
              <MenuItem
                key={index}
                {...option.menuItemProps}
                className="!text-black dark:!text-white"
                {...(option.href && { sx: { p: 0 } })}
                onClick={e => {
                  handleClose();
                  if (option.function) {
                    option.function(); // Call the function associated with the option
                  }
                  option.menuItemProps && option.menuItemProps.onClick ? option.menuItemProps.onClick(e) : null;
                }}
              >
                <MenuItemWrapper option={option}>
                  {option.icon ? option.icon : null}
                  <p className='text-black dark:text-white'>
                    
                  {option.text}
                  </p>
                </MenuItemWrapper>
              </MenuItem>
            )
          }
        })}
      </Menu>
    </>
  )
}

export default OptionsMenu
