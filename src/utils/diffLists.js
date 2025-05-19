export const diffLists = (oldList, newList) => {
  const oldMap = new Map(oldList.map((item, index) => [item.id, index]))
  const newMap = new Map(newList.map((item, index) => [item.id, index]))

  const added = []
  const removed = []
  const moved = []
  const stable = []

  for (const item of newList) {
    if (!oldMap.has(item.id)) {
      added.push(item)
    }
  }

  for (const item of oldList) {
    if (!newMap.has(item.id)) {
      removed.push(item)
    }
  }

  for (const item of newList) {
    if (oldMap.has(item.id)) {
      const oldIndex = oldMap.get(item.id)
      const newIndex = newMap.get(item.id)

      if (oldIndex === newIndex) {
        stable.push(item)
      } else {
        moved.push(item)
      }
    }
  }

  return { added, removed, moved, stable }
}
