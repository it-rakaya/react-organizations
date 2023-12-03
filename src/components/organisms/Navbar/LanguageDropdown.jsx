/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import IconifyIcon from '../../atoms/icons/IconifyIcon'
import OptionsMenu from './option-menu/OptionsMenu'
const LanguageDropdown = ({ settings, saveSettings }) => {
  const { i18n } = useTranslation()
  const handleLangItemClick = lang => {
    i18n.changeLanguage(lang)
  }

  useEffect(() => {
    document.documentElement.setAttribute('lang', i18n.language)
  }, [i18n.language])

  return (
    <OptionsMenu
      icon={<IconifyIcon icon='mdi:translate' />}
      menuProps={{ sx: { '& .MuiMenu-paper': { mt: 4, minWidth: 130 } } }}
      iconButtonProps={{ color: 'inherit', sx: { ...( { mr: 0.75 } ) } }}
      options={[
        {
          text: 'English',
          menuItemProps: {
            sx: { py: 2 },
            selected: i18n.language === 'en',
            onClick: () => {
              handleLangItemClick('en')
              saveSettings({ ...settings, direction: 'ltr' })
            }
          }
        },
        // {
        //   text: 'French',
        //   menuItemProps: {
        //     sx: { py: 2 },
        //     selected: i18n.language === 'fr',
        //     onClick: () => {
        //       handleLangItemClick('fr')
        //       saveSettings({ ...settings, direction: 'ltr' })
        //     }
        //   }
        // },
        {
          text: 'Arabic',
          menuItemProps: {
            sx: { py: 2 },
            selected: i18n.language === 'ar',
            onClick: () => {
              handleLangItemClick('ar')
              saveSettings({ ...settings, direction: 'rtl' })
            }
          }
        }
      ]}
    />
  )
}

export default LanguageDropdown
