import { create as useStore } from 'zustand'
import dayjs from 'dayjs'
import {themeColors, setThemeColor} from '../utils/themeColors'
import {createLsValue, getLsValue, setLsValue} from '../utils/lsValue'
import {validate} from '../utils/validate'
import {storageSamples} from '../utils/storageSamples'

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

  themeColor: createLsValue('themeColor', 'ORANGE', get, set, value => setThemeColor(value)),
  updateThemeColor: color => {
    get().themeColor.setter(color)
    setLsValue('themeColor', color)
  },

  nextTaskId: createLsValue('nextTaskId', 0, get, set),
  increaseNextTaskId: () => {
    const nextTaskId = get().nextTaskId.value + 1
    get().nextTaskId.setter(nextTaskId)
    setLsValue('nextTaskId', nextTaskId)
  },

  tasks: createLsValue('tasks', [], get, set),
  getTask: id => get().tasks.value.find(task => task.id === id),
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

  nextWalletId: createLsValue('nextWalletId', 0, get, set),
  increaseNextWalletId: () => {
    const nextWalletId = get().nextWalletId.value + 1
    get().nextWalletId.setter(nextWalletId)
    setLsValue('nextWalletId', nextWalletId)
  },

  wallets: createLsValue('wallets', [], get, set),
  getWallet: id => get().wallets.value.find(wallet => wallet.id === id),
  addWallet: ({name, balance, main}) => {
    const wallet = {name, balance, id: get().nextWalletId.value}
    if (main) {
      get().clearMainWallet()
      wallet.main = true
    }
    const wallets = [...get().wallets.value, wallet]

    get().increaseNextWalletId()

    get().wallets.setter(wallets)
    setLsValue('wallets', wallets)
  },
  modifyWallet: ({id, name, balance, main}) => {
    const wallet = {id, name, balance}
    get().removeWallet(id)
    if (main) {
      get().clearMainWallet()
      wallet.main = true
    }
    const wallets = [...get().wallets.value, wallet]

    get().wallets.setter(wallets)
    setLsValue('wallets', wallets)
  },
  removeWallet: walletId => {
    const wallets = get().wallets.value.filter(wallet => wallet.id !== walletId)

    get().wallets.setter(wallets)
    setLsValue('wallets', wallets)
  },
  clearMainWallet: () => {
    const wallets = get().wallets.value.map(wallet => {
      const {main, ...rest} = wallet
      return rest
    })

    get().wallets.setter(wallets)
    setLsValue('wallets', wallets)
  },

  importStorage: data => {
    try { data = JSON.parse(data) }
    catch (e) {
      console.log('Wrong JSON format')
      return
    }

    for (const [key, value] of Object.entries(data)) {
      const {sample, setter} = get()[key]

      if (sample && setter) {
        const validationErrors = validate(value, sample)

        if (!validationErrors.length) {
          setter(value)
          setLsValue(key, value)
        }
        else
          console.log(key, validationErrors)
      }
    }
  },
  exportStorage: () => {
    return JSON.stringify({
      themeColor: get().themeColor.value,
      nextTaskId: get().nextTaskId.value,
      tasks: get().tasks.value,
      nextWalletId: get().nextWalletId.value,
      wallets: get().wallets.value,
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
setThemeColor(useGlobalStore.getState().themeColor.value)