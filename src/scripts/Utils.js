class Utils {
  static showElement(element, display = 'block') {
    element.style.display = display
    element.hidden = false
  }

  static hideElement(element) {
    element.style.display = 'none'
    element.hidden = true
  }
}

export default Utils