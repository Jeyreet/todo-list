export const themeColors = {
  ORANGE: '--c-orange',
  RED: '--c-red',
  BLUE: '--c-blue',
  PURPLE: '--c-purple',
  GREEN: '--c-green',
  CYAN: '--c-cyan',
  GRAY: '--c-gray',
  BLACK: '--c-black',
}

export const setThemeColor = color => {
  if (!themeColors.hasOwnProperty(color)) return false
  document.documentElement.style.setProperty('--c-accent', `var(${themeColors[color]})`)
  return true
}