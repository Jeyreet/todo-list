export const numberSort = key => ({
  asc: arr => arr.sort((a, b) => a[key] - b[key]),
  desc: arr => arr.sort((a, b) => b[key] - a[key])
})
