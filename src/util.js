import { isFunction } from 'lodash'

export function getHexColor(n) {
  const radix = 0x10
  const base = radix ** 6
  return "#" + ((n % base) + base).toString(radix).slice(1)
}

export function generateArray(length, item) {
  const array = new Array(length)
  for (let i = 0; i < length; i++)
    array[i] = isFunction(item) ? item() : item
  return array
}
