import { validate } from './validate'
import {storageSamples} from './storageSamples'

export const createLsValue = (key, initial, get, set, customSetter = () => {}) => {
  return {
    value: getLsValue(key, storageSamples[key], initial),
    sample: storageSamples[key],
    initial: initial,
    setter: value => {
      const errors = validate(value, storageSamples[key]).length
      if (errors) return errors
      set({[key]: {...get()[key], value: value}})
      customSetter(value)
    }
  }
}

export const getLsValue = (key, sample, initial) => {
  try {
    const value = JSON.parse(localStorage.getItem(key))
    return validate(value, sample).length ? initial : value
  }
  catch (e) {
    return initial
  }
}

export const setLsValue = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  }
  catch (e) {
    console.log(e)
  }
}