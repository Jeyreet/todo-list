import { create as useStore } from 'zustand'

const themeColors = {
  ORANGE: '--c-orange',
  RED: '--c-red',
  BLUE: '--c-blue',
  PURPLE: '--c-purple',
  GREEN: '--c-green',
  CYAN: '--c-cyan',
  BLACK: '--c-black',
}

const setThemeColor = (color) => {
  document.documentElement.style.setProperty('--c-accent', `var(${themeColors[color]})`)
}

const getLsValue = (key, initial) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? initial
  }
  catch (e) {
    return initial
  }
}

const setLsValue = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  }
  catch (e) {
    console.log(e)
  }
}

export const useGlobalStore = useStore((set, get) => ({
  isMenuOpen: false,
  openMenu: () => set({isMenuOpen: true}),
  closeMenu: () => set({isMenuOpen: false}),

  isModalOpen: false,
  modalContent: null,
  openModal: content => set({
    isModalOpen: true,
    modalContent: content,
  }),
  closeModal: () => set({isModalOpen: false}),

  isScreenWide: false,
  wideScreen: () => set({isScreenWide: true}),
  narrowScreen: () => set({isScreenWide: false}),

  headerTitle: null,
  setHeaderTitle: text => set({headerTitle: text}),

  escapeHandlers: [],
  addEscapeHandler: handler => set({escapeHandlers: [...get().escapeHandlers, handler]}),
  removeEscapeHandler: handler => set({escapeHandlers: get().escapeHandlers.filter(h => h !== handler)}),
  runAndSliceLastEscapeHandler: () => {
    get().escapeHandlers[get().escapeHandlers.length - 1]()
    set({escapeHandlers: get().escapeHandlers.slice(0, -1)})
  },

  themeColor: {
    value: getLsValue('themeColor', 'ORANGE'),
    initial: themeColors.ORANGE,
    validator: data => data in themeColors ? data : false,
    setter: color => {
      set({themeColor: {...get().themeColor, value: color}})
      setThemeColor(color)
    }
  },
  updateThemeColor: color => {
    get().themeColor.setter(color)
    setLsValue('themeColor', color)
  },

  nextTaskId: {
    value: getLsValue('nextTaskId', 0),
    initial: 0,
    validator: data => isNaN(Number(data)) ? false : Number(data),
    setter: nextTaskId => set({nextTaskId: {...get().nextTaskId, value: nextTaskId}})
  },
  increaseNextTaskId: () => {
    const nextTaskId = get().nextTaskId.value + 1
    get().nextTaskId.setter(nextTaskId)
    setLsValue('nextTaskId', nextTaskId)
  },

  tasks: {
    value: getLsValue('tasks', []),
    initial: [],
    validator: data => {
      if (Array.isArray(data)) {
        if (
          data.filter(task =>
            ['id', 'name', 'desc', 'start', 'end', 'done'].every(key =>
              task.hasOwnProperty(key)
            )
          ).length === data.length
        )
          return data
      }
      return false
    },
    setter: tasks => set({tasks: {...get().tasks, value: tasks}})
  },
  addTask: ({name, desc, start, end}) => {
    const task = {name, desc, start, end, id: get().nextTaskId.value, done: false}
    const tasks = [...get().tasks.value, task]

    get().tasks.setter(tasks)
    setLsValue('tasks', tasks)
    get().increaseNextTaskId()
  },
  toggleTask: taskId => {
    const tasks = get().tasks.value.map(task =>
      task.id === taskId ? { ...task, done: !task.done } : task
    )

    get().tasks.setter(tasks)
    setLsValue('tasks', tasks)
  },
  removeTask: taskId => {
    const tasks = get().tasks.value.filter(task => task.id !== taskId)

    get().tasks.setter(tasks)
    setLsValue('tasks', tasks)
  },

  importStorage: data => {
    data = JSON.parse(data)

    for (const [key, value] of Object.entries(data)) {
      const validation = get()?.[key]?.validator

      if (validation !== false && validation !== undefined) {
        get()[key].setter(value)
        setLsValue(key, value)
      }
    }
  },
  exportStorage: () => {
    return JSON.stringify({
      themeColor: get().themeColor.value,
      nextTaskId: get().nextTaskId.value,
      tasks: get().tasks.value,
    })
  }
}))

const mediaQuery = window.matchMedia("(max-width: 1200px)")

const handleResize = (e) => {
  const gss = useGlobalStore.getState()

  if (e.matches) {
    gss.narrowScreen()
    gss.closeMenu()
  }
  else
    gss.wideScreen()
}

const handleEscape = e => {
  const gss = useGlobalStore.getState()

  if (e.key === 'Escape' && gss.escapeHandlers.length)
    gss.runAndSliceLastEscapeHandler()
}

const handleLocalStorage = e => {
  const gss = useGlobalStore.getState()

  if (Object.keys(gss).includes(e.key) && Object.keys(gss[e.key]).includes('setter'))
    try {
      gss[e.key].setter(getLsValue(e.key))
    } catch (e) {
      console.log(e)
    }
}

handleResize(mediaQuery)

mediaQuery.addEventListener('change', handleResize)
document.addEventListener('keydown', handleEscape)
window.addEventListener('storage', handleLocalStorage)
setThemeColor(getLsValue('themeColor'))