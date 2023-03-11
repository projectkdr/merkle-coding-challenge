// Check if a value is empty
export const isEmpty = (value: any): boolean => (
  // null or undefined
  (value === undefined || value === null) ||
  // an empty string
  (typeof value === 'string' && value.length === 0) ||
  // has length and it's zero
  (Array.isArray(value) && value.length === 0) ||
  // is an Object and has no keys
  (value.constructor === Object && Object.keys(value).length === 0)
)

// Convert date to 'dd mmmm, yyyy' format
export const formatDate = (timeStamp: number): string => {
  // Multiply by 1000 to convert from seconds to milliseconds
  const date = new Date(timeStamp * 1000)
  const dateString = date.toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' })

  return dateString
}