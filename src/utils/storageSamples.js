import dayjs from 'dayjs'
import {themeColors} from './themeColors'
import tasks from "../pages/Tasks/Tasks.jsx";

export const storageSamples = {
  themeColor: {
    types: 'string',
    validator: themeColor => themeColor in themeColors ? false : 'COLOR_NOT_EXISTS'
  },

  nextTaskId: {
    types: 'number',
    validator: nextTaskId => nextTaskId >= 0 ? false : 'LESS_THAN_ZERO'
  },

  tasks: {
    types: 'array',
    items: {
      types: 'object',
      keys: {
        id: {
          types: 'number'
        },
        name: {
          types: 'string'
        },
        desc: {
          required: false,
          types: 'string'
        },
        start: {
          types: 'string',
          validator: start => dayjs(start, 'YYYY-MM-DD', true).isValid() ? false : 'INVALID_DATE'
        },
        end: {
          types: 'string',
          validator: end => dayjs(end, 'YYYY-MM-DD', true).isValid() ? false : 'INVALID_DATE'
        },
        done: {
          types: 'boolean',
        }
      }
    }
  },

  nextWalletId: {
    types: 'number',
    validator: nextWalletId => nextWalletId >= 0 ? false : 'LESS_THAN_ZERO'
  },

  wallets: {
    types: 'array',
    items: {
      types: 'object',
      keys: {
        id: {
          types: 'number'
        },
        name: {
          types: 'string'
        },
        balance: {
          types: 'number'
        },
        main: {
          required: false,
          types: 'boolean'
        }
      }
    }
  }
}