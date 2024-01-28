/* eslint-disable react/prop-types */

import CssBaseline from '@mui/material/CssBaseline'
import GlobalStyles from '@mui/material/GlobalStyles'
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles'
import GlobalStyling from './globalStyles'
import themeOptions from './ThemeOptions'
import themeConfig from '../../themeConfig'
import Direction from './Direction'

const ThemeComponent = props => {
  const { settings, children } = props
  let theme = createTheme(themeOptions(settings, 'dark'))
  if (themeConfig.responsiveFontSizes) {
    theme = responsiveFontSizes(theme)
  }

  return (
    <ThemeProvider theme={theme}>
      <Direction direction={settings.direction}>
        <CssBaseline />
        <GlobalStyles styles={() => GlobalStyling(theme)} />
        {children}
      </Direction>
    </ThemeProvider>
  )
}

export default ThemeComponent
