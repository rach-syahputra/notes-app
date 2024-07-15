class Utils {
  static emptyElement(element) {
    element.innerHTML = ''
  }

  static showElement(element, display = 'block') {
    element.style.display = display
    element.hidden = false
  }

  static hideElement(element) {
    element.style.display = 'none'
    element.hidden = true
  }

  static formatDate(dateStr) {
    const date = new Date(dateStr)

    const day = date.getUTCDate()
    const month = date.toLocaleString('default', { month: 'long' })
    const year = date.getUTCFullYear()
    const hours = String(date.getUTCHours()).padStart(2, '0')
    const minutes = String(date.getUTCMinutes()).padStart(2, '0')

    const formattedDate = `${day} ${month} ${year}, ${hours}:${minutes}`

    return formattedDate
  }
}

export default Utils
