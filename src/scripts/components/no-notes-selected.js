class NoNotesSelected extends HTMLElement {
  _shadowRoot = null
  _style = null

  _fontcolor = ''

  static get observedAttributes() {
    return ['fontcolor']
  }

  constructor() {
    super()

    this._shadowRoot = this.attachShadow({ mode: 'open' })
    this._style = document.createElement('style')

    this.render()
  }

  set fontcolor(value) {
    this._fontcolor = value
  }

  get fontcolor() {
    return this._fontcolor
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = ''
  }

  _udpateStyle() {
    this._style.textContent = `
    :host {
      display: block;
      overflow: hidden;
    }

    h2 {
      color: ${this.fontcolor};
      margin-block: 64px;
    }
    `
  }

  connectedCallback() {
    this.render()
  }

  render() {
    this._emptyContent()
    this._udpateStyle()

    this._shadowRoot.appendChild(this._style)
    this._shadowRoot.innerHTML += `
      <h2>No notes selected</h2>
    `
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'fontcolor':
        this.fontcolor = newValue
        break
    }

    this.render()
  }
}
customElements.define('no-notes-selected', NoNotesSelected)
