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

const lsInitials = {
  themeColor: themeColors.ORANGE,
  nextTaskId: 0,
  tasks: []
}

const getLsValue = (key) => {
  const value = JSON.parse(localStorage.getItem(key))
  const initial = lsInitials[key]

  try {
    return value ?? initial
  }
  catch {
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

  themeColor: getLsValue('themeColor'),
  setThemeColor: color => {
    set({themeColor: color})
    document.documentElement.style.setProperty('--c-accent', `var(${themeColors[color]})`)
  },
  updateThemeColor: color => {
    get().setThemeColor(color)
    setLsValue('themeColor', color)
  },

  nextTaskId: getLsValue('nextTaskId'),
  setNextTaskId: nextTaskId => set({nextTaskId: nextTaskId}),
  increaseNextTaskId: () => {
    const nextTaskId = get().nextTaskId + 1
    get().setNextTaskId(nextTaskId)
    setLsValue('nextTaskId', nextTaskId)
  },

  tasks: getLsValue('tasks'),
  setTasks: tasks => set({tasks: tasks}),
  addTask: ({name, desc, start, end}) => {
    const task = {name, desc, start, end, id: get().nextTaskId, done: false}
    const tasks = [...get().tasks, task]

    get().setTasks(tasks)
    setLsValue('tasks', tasks)
    get().increaseNextTaskId()
  },
  toggleTask: taskId => {
    const tasks = get().tasks.map(task =>
      task.id === taskId ? { ...task, done: !task.done } : task
    )

    get().setTasks(tasks)
    setLsValue('tasks', tasks)
  },
  removeTask: taskId => {
    const tasks = get().tasks.filter(task => task.id !== taskId)

    get().setTasks(tasks)
    setLsValue('tasks', tasks)
  }
}))

const gss = useGlobalStore.getState()

const mediaQuery = window.matchMedia("(max-width: 1200px)")

const handleResize = (e) => {
  if (e.matches) {
    gss.narrowScreen()
    gss.closeMenu()
  }
  else
    gss.wideScreen()
}

const handleEscape = e => {
  const {escapeHandlers} = useGlobalStore.getState()

  if (e.key === 'Escape' && escapeHandlers.length)
    gss.runAndSliceLastEscapeHandler()
}

const lsSetters = {
  nextTaskId: gss.setNextTaskId,
  tasks: gss.setTasks,
  themeColor: gss.setThemeColor
}

const handleLocalStorage = e => {
  if (Object.keys(lsSetters).includes(e.key))
    try {
      lsSetters[e.key](getLsValue(e.key))
    } catch (e) {
      console.log(e)
    }
}

handleResize(mediaQuery)

mediaQuery.addEventListener('change', handleResize)
document.addEventListener('keydown', handleEscape)
window.addEventListener('storage', handleLocalStorage)
document.documentElement.style.setProperty('--c-accent', `var(${themeColors[getLsValue('themeColor')]})`)