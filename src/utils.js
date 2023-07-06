export function limitDecimalPlaces(number) {
  if (Number.isInteger(number)) {
    // Return as-is if it’s an integer
    return number
  } else {
    const decimalPlaces = number.toString().split('.')[1]?.length || 0
    if (decimalPlaces > 10) {
      // Limit to 10 decimal places
      return parseFloat(number.toFixed(10))
    } else {
      // Return the original decimal number
      return number
    }
  }
}

export function generateExcelColumnHeader(index) {
  let header = ''
  while (index >= 0) {
    header = String.fromCharCode(65 + (index % 26)) + header
    index = Math.floor(index / 26) - 1
  }
  return header
}
