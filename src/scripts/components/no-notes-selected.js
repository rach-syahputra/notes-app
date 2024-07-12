class NoNotesSelected extends HTMLElement {
  _shadowRoot = null
  _style = null

  constructor() {
    super()

    this._shadowRoot = this.attachShadow({ mode: 'open' })
    this._style = document.createElement('style')

    this.render()
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
      color: #A0A6A5;
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
}
customElements.define('no-notes-selected', NoNotesSelected)