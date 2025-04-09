export const validate = (value, sample, path = 'root') => {
  const errors = []

  if (value === undefined)
    if (sample.required !== false) {
      errors.push({
        type: 'REQUIRED_FIELD_MISSING',
        path
      })
      return errors
    }

  else
    return errors

  if (sample.types) {
    const types = Array.isArray(sample.types) ? sample.types : [sample.types]
    const valueType = Array.isArray(value) ? 'array' : typeof value
    const typeValid = types.some(type => {
      if (type === 'array') return Array.isArray(value)
      if (type === 'null') return value === null
      return typeof value === type || (type === 'object' && value !== null && !Array.isArray(value))
    })

    if (!typeValid) {
      errors.push({
        type: 'TYPE_MISMATCH',
        path,
        expected: types,
        got: valueType
      })

      return errors
    }
  }

  if (sample.validator) {
    const validateResult = sample.validator(value)

    if (validateResult) {
      errors.push({
        type: validateResult,
        path
      })

      return errors
    }
  }

  if (sample.keys && value && typeof value === 'object' && !Array.isArray(value))
    for (const [key, keySample] of Object.entries(sample.keys)) {
      const keyErrors = validate(value[key], keySample, `${path}.${key}`)
      errors.push(...keyErrors)
    }

  if (sample.items && Array.isArray(value))
    for (let i = 0; i < value.length; i++) {
      const itemErrors = validate(value[i], sample.items, `${path}[${i}]`)
      errors.push(...itemErrors)
    }

  return errors
}