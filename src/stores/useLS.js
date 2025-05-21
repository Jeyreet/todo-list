import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { z } from 'zod'
import { create } from 'zustand'

dayjs.extend(customParseFormat)

const stringifyDate = date =>
  date?.isValid() ? date.format('DD.MM.YYYY') : undefined

const zodDate = (format = 'DD.MM.YYYY') =>
  z.string().refine(value => dayjs(value, format, true).isValid())

const zodObjectsArray = objectSchema =>
  z
    .array(z.any())
    .transform(objects =>
      objects
        .map(object => objectSchema.safeParse(object))
        .filter(r => r.success)
        .map(r => r.data)
    )
    .catch([])

const taskSchema = z.object({
  id: z.number(),
  name: z.string(),
  desc: z.string().optional(),
  start: zodDate().optional(),
  end: zodDate().optional(),
  done: z.literal(true).optional()
})

const operationSchema = z.object({
  id: z.number(),
  category: z.number(),
  wallet: z.number(),
  amount: z.number(),
  desc: z.string().optional()
})

const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  type: z.enum(['income', 'expense']).optional(),
  parent: z.number().optional()
})

const walletSchema = z.object({
  id: z.number(),
  name: z.string(),
  balance: z.number(),
  main: z.literal(true).optional()
})

const schema = z.object({
  themeMainColor: z.number().catch(6),
  borderRadius: z.boolean().catch(true),
  theme: z.enum(['system', 'light', 'dark']).catch('system'),
  gap: z.enum(['standard', 'big', 'small']).catch('standard'),

  tasks: zodObjectsArray(taskSchema),
  operations: zodObjectsArray(operationSchema),
  categories: zodObjectsArray(categorySchema),
  wallets: zodObjectsArray(walletSchema),

  taskRemoveConfirmation: z.boolean().catch(true),
  settingsImportProtection: z.boolean().catch(false)
})

const settingsFields = [
  'borderRadius',
  'gap',
  'taskRemoveConfirmation',
  'settingsImportProtection',
  'theme',
  'themeMainColor'
]

const parseString = string => {
  try {
    const data = JSON.parse(string)
    return schema.parse(data)
  } catch {
    return schema.parse({})
  }
}

export const useLS = create(() => parseString(localStorage.getItem('data')))

const _LSControls = {
  setBorderRadius: borderRadius => useLS.setState({ borderRadius }),
  setTheme: theme => useLS.setState({ theme }),
  setGap: gap => useLS.setState({ gap }),

  setTasks: tasks => useLS.setState({ tasks }),
  setOperations: operations => useLS.setState({ operations }),
  setCategories: categories => useLS.setState({ categories }),
  setWallets: wallets => useLS.setState({ wallets }),

  setTaskRemoveConfirmation: taskRemoveConfirmation =>
    useLS.setState({ taskRemoveConfirmation }),
  setSettingsImportProtection: settingsImportProtection =>
    useLS.setState({ settingsImportProtection })
}

export const LSControls = {
  getThemeMainColor: () => useLS.getState().themeMainColor,
  setThemeMainColor: themeMainColor => useLS.setState({ themeMainColor }),

  getBorderRadius: () => useLS.getState().borderRadius,
  enableBorderRadius: () => _LSControls.setBorderRadius(true),
  disableBorderRadius: () => _LSControls.setBorderRadius(false),

  getTheme: () => useLS.getState().theme,
  setLightTheme: () => _LSControls.setTheme('light'),
  setDarkTheme: () => _LSControls.setTheme('dark'),
  clearTheme: () => _LSControls.setTheme('system'),

  getGap: () => useLS.getState().gap,
  setBigGap: () => _LSControls.setGap('big'),
  setStandardGap: () => _LSControls.setGap('standard'),
  setSmallGap: () => _LSControls.setGap('small'),

  getSettingsImportProtection: () => useLS.getState().settingsImportProtection,
  enableSettingsImportProtection: () =>
    _LSControls.setSettingsImportProtection(true),
  disableSettingsImportProtection: () =>
    _LSControls.setSettingsImportProtection(false),

  getTaskRemoveConfirmation: () => useLS.getState().taskRemoveConfirmation,
  enableTaskRemoveConfirmation: () =>
    _LSControls.setTaskRemoveConfirmation(true),
  disableTaskRemoveConfirmation: () =>
    _LSControls.setTaskRemoveConfirmation(false),

  getTask: id => useLS.getState().tasks.find(task => task.id === id),
  addTask: data => {
    const tasks = useLS.getState().tasks

    const newTask = {
      ...data,
      id: tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 0,
      start: stringifyDate(data.start),
      end: stringifyDate(data.end)
    }

    _LSControls.setTasks([...tasks, newTask])
  },
  toggleTask: id => {
    const tasks = useLS.getState().tasks

    _LSControls.setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, done: task.done ? undefined : true } : task
      )
    )
  },
  modifyTask: (id, data) => {
    const tasks = useLS.getState().tasks

    const modifiedData = {
      ...data,
      start: stringifyDate(data.start),
      end: stringifyDate(data.end)
    }

    _LSControls.setTasks(
      tasks.map(t => (t.id === id ? { ...t, ...modifiedData } : t))
    )
  },
  removeTask: id =>
    _LSControls.setTasks(useLS.getState().tasks.filter(task => task.id !== id)),

  getOperation: id =>
    useLS.getState().operations.find(operation => operation.id === id),
  addOperation: data => {
    const operations = useLS.getState().operations

    const newOperation = {
      ...data,
      desc: data.desc ? data.desc : undefined,
      id: operations.length ? Math.max(...operations.map(t => t.id)) + 1 : 0
    }

    _LSControls.setOperations([...operations, newOperation])
  },

  getCategory: id =>
    useLS.getState().categories.find(category => category.id === id),
  addCategory: data => {
    const categories = useLS.getState().categories

    const newCategory = {
      ...data,
      id: categories.length ? Math.max(...categories.map(t => t.id)) + 1 : 0
    }

    _LSControls.setCategories([...categories, newCategory])
  },
  modifyCategory: (id, data) => {
    const categories = useLS.getState().categories

    _LSControls.setCategories(
      categories.map(c => (c.id === id ? { ...c, ...data } : c))
    )
  },
  removeCategory: id => {
    const categories = useLS.getState().categories

    let remaining = categories.filter(c => c.id !== id)

    const removeDirectChildren = (remaining, id) => {
      const removed = []
      remaining = remaining.filter(c => {
        const remains = c.parent !== id
        if (!remains) removed.push(c.id)
        return remains
      })

      return { removed, remaining }
    }

    const removeAllDescendants = (remaining, ids) => {
      for (const id of ids) {
        const result = removeDirectChildren(remaining, id)
        remaining = removeAllDescendants(result.remaining, result.removed)
      }

      return remaining
    }

    _LSControls.setCategories(removeAllDescendants(remaining, [id]))
  },

  getWallet: id => useLS.getState().wallets.find(wallet => wallet.id === id),
  addWallet: data => {
    const wallets = useLS.getState().wallets

    const newWallet = {
      ...data,
      id: wallets.length ? Math.max(...wallets.map(w => w.id)) + 1 : 0,
      main: data.main ? true : undefined
    }

    const updatedWallets = wallets.map(w => ({
      ...w,
      main: newWallet.main ? undefined : w.main
    }))

    _LSControls.setWallets([...updatedWallets, newWallet])
  },
  modifyWallet: (id, data) => {
    const wallets = useLS.getState().wallets

    const modifiedData = {
      ...data,
      main: data.main ? true : undefined
    }

    _LSControls.setWallets(
      wallets.map(w =>
        w.id === id
          ? { ...w, ...modifiedData }
          : { ...w, main: modifiedData.main ? undefined : w.main }
      )
    )
  },
  removeWallet: id =>
    _LSControls.setWallets(
      useLS.getState().wallets.filter(wallet => wallet.id !== id)
    ),

  import: serializedStore => {
    const parsedStore = parseString(serializedStore)
    if (LSControls.getSettingsImportProtection())
      settingsFields.forEach(field => delete parsedStore[field])
    useLS.setState({ ...useLS.getState, ...parsedStore })
  },
  export: () => JSON.stringify(useLS.getState()),
  reset: () => {
    localStorage.setItem('data', '')
    useLS.setState(parseString())
  }
}

let isExternalUpdate = false

useLS.subscribe(state => {
  if (!isExternalUpdate) localStorage.setItem('data', JSON.stringify(state))
})

window.addEventListener('storage', e => {
  if (e.key === 'data') {
    isExternalUpdate = true
    useLS.setState(parseString(e.newValue))
    isExternalUpdate = false
  }
})
