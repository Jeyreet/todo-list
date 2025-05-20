import clsx from 'clsx'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { HashRouter } from 'react-router-dom'

import { useLS } from '../../stores/useLS'
import c from './App.module.scss'
import { Body } from './Body'
import { Portal as FixedPortal } from './FixedPortal/Portal'
import { Menu } from './Menu'
import { Portal as PopupPortal } from './PopupPortal/Portal'

const themeQuery = window.matchMedia('(prefers-color-scheme: dark)')

export const App = () => {
  const theme = useLS(state => state.theme)
  const themeMainColor = useLS(state => state.themeMainColor)
  const borderRadius = useLS(state => state.borderRadius)
  const gap = useLS(state => state.gap)

  const [isSystemDark, setIsSystemDark] = useState(themeQuery.matches)
  const [isDark, setIsDark] = useState(null)
  const [isSwitchingTheme, setIsSwitchingTheme] = useState(false)
  const themeSwitchTimeout = useRef(null)
  const hasMounted = useRef(false)

  useLayoutEffect(() => {
    const appRenderedQuery = new CustomEvent('app_rendered')
    window.dispatchEvent(appRenderedQuery)

    if (themeQuery.matches) setIsSystemDark(true)

    const themeChanged = e => {
      if (e.matches) setIsSystemDark(true)
      else setIsSystemDark(false)
    }

    themeQuery.addEventListener('change', themeChanged)
    return () => themeQuery.removeEventListener('change', themeChanged)
  }, [])

  useEffect(() => {
    setIsDark(prevIsDark => {
      const newIsDark = theme === 'dark' || (theme === 'system' && isSystemDark)

      if (prevIsDark !== newIsDark) {
        clearTimeout(themeSwitchTimeout.current)
        if (hasMounted.current) setIsSwitchingTheme(true)
        themeSwitchTimeout.current = setTimeout(
          () => setIsSwitchingTheme(false),
          500
        )
      }

      hasMounted.current = true
      return newIsDark
    })
  }, [isSystemDark, theme])

  return (
    <HashRouter>
      <div
        className={clsx(
          c.App,
          isDark && 'dark',
          isSwitchingTheme && c.switchingTheme
        )}
        style={{
          '--caAngle': themeMainColor * 3.6,
          '--brr': `${borderRadius * 8}px`,
          '--gap': `${gap === 'big' ? '16' : gap === 'standard' ? '8' : '4'}px`
        }}
      >
        <div className={c.wrapper}>
          <Menu />
          <Body />
          <FixedPortal />
          <PopupPortal />
        </div>
      </div>
    </HashRouter>
  )
}
