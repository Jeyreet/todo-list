export const calculatePoint = element => {
  const styles = window.getComputedStyle(element)
  const rect = element.getBoundingClientRect()

  return {
    x: rect.left + parseInt(styles.width) / 2,
    y: rect.top + parseInt(styles.height) / 2
  }
}
