export const booleanSort = key => ({
  asc: arr =>
    arr.sort((a, b) => {
      if (a[key] === b[key]) return 0
      if (a[key]) return -1
      return 1
    }),
  desc: arr =>
    arr.sort((a, b) => {
      if (a[key] === b[key]) return 0
      if (!a[key]) return -1
      return 1
    })
})
