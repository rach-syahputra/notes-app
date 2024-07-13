class Utils {
  static emptyElement(element) {
    element.innerHTML = '';
  }

  static showElement(element, display = 'block') {
    element.style.display = display;
    element.hidden = false;
  }

  static hideElement(element) {
    element.style.display = 'none';
    element.hidden = true;
  }

  static isValidInteger(newValue) {
    return Number.isNaN(newValue) || Number.isFinite(newValue);
  }
}

export default Utils;