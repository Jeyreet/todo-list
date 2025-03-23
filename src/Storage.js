import _ from 'lodash'

export class Storage {
  static #initials = {
    storage: {
      todo: {
        nextTaskId: 0,
        tasks: []
      },
      budget: {
        nextCategoryId: 0,
        categories: [],
        nextWalletId: 0,
        wallets: []
      },
    },

    task: {
      id: null,
      name: null,
      expiresIn: null,
      start: null,
      end: null,
      completed: false
    },

    category: {
      id: null,
      name: null,
      type: 'outcome',
      parentCategoryId: null
    },

    wallet: {
      id: null,
      name: null,
      balance: 0,
      operations: []
    },

    operation: {
      description: null,
      category: null,
      amount: 0
    },
  }

  static #storage

  static getTask(taskId) {
    if (taskId !== undefined) {
      return _.cloneDeep(this.#storage.todo.tasks.filter(task => task.id === taskId)[0])
    }
    else {
      return _.cloneDeep(this.#storage.todo.tasks)
    }
  }

  static addTask({ name = null, desc = null, start = null, end = null, completed = false }) {
    this.#storage.todo.tasks.push({
      id: this.#storage.todo.nextTaskId++,
      name: String(name),
      desc: String(desc),
      start: Number(start),
      end: Number(end),
      completed: Boolean(completed),
    })

    this.save()
  }

  static modifyTask(taskId, {}) {

  }

  static clearTask(taskId) {
    if (taskId !== undefined) {
      this.#storage.todo.tasks = this.#storage.todo.tasks.filter(task => task.id !== taskId)
    }
    else {
      this.#storage.todo.tasks = []
    }

    this.save()
  }

  static load() {
    this.#storage = JSON.parse(localStorage.getItem('storage')) ?? _.cloneDeep(this.#initials.storage)
  }

  static save() {
    localStorage.setItem('storage', JSON.stringify(this.#storage))
  }
}