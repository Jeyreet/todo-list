export const makePrecision = (value, precision) =>
  (value / 10 ** precision).toLocaleString('ru-RU', {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision
  })
