export function isEmpty(value: string | null | undefined) {
  // eslint-disable-next-line no-null/no-null
  return value === undefined || value === null || value.trim() === ''
}
