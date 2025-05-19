export const stringsSort = key => ({
  asc: arr =>
    arr.sort((a, b) => {
      if (!a[key]) return 1
      if (!b[key]) return -1
      return a[key]?.localeCompare(b[key])
    }),
  desc: arr =>
    arr.sort((a, b) => {
      if (!a[key]) return 1
      if (!b[key]) return -1
      return b[key]?.localeCompare(a[key])
    })
})
