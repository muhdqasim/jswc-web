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

export function checkCharacterOccurrences(inputString, character) {
  let count = 0
  for (let i = 0; i < inputString.length; i++) {
    if (inputString[i] === character) {
      count++
    }
    if (count > 2) {
      return false
    }
  }
  return count === 2
}

export function returnStyles(Properties, position, backgroundColor) {
  const formStyle = {
    position,
    top: `${Properties?.Posn[0]}px`,
    left: `${Properties?.Posn[1]}px`,
    maxHeight: Properties?.Size[0],
    maxWidth: Properties?.Size[1],
    minHeight: Properties?.Size[0],
    minWidth: Properties?.Size[1],
    backgroundColor,
  }

  return formStyle
}
