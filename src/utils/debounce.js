export const debounce = (timeoutId, fn, delay) => {
  clearTimeout(timeoutId)
  return setTimeout(fn, delay)
}
