export const mergeRefs =
  (...refs) =>
  node => {
    refs.forEach(ref => {
      if (typeof ref === 'function') ref(node)
      else if (ref) ref.current = node
    })
  }
