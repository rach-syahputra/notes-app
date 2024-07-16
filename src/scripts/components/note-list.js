class NoteList extends HTMLElement {
  _shadowRoot = null
  _style = null

  _column = 0
  _gutter = 0

  static get observedAttributes() {
    return ['column', 'gutter']
  }

  constructor() {
    super()

    this._shadowRoot = this.attachShadow({ mode: 'open' })
    this._style = document.createElement('style')

    this.render()
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
        display: block;
      }
      
      .list {
        display: grid;
        grid-template-columns: ${'1fr '.repeat(this.column)};
        gap: ${this.gutter}px;
        padding: 0 8px;
        opacity: 0;
        margin-top: 16px;
      }

      .show {
        margin-top: 0;
        opacity: 1;
        transition: all .8s ease-out;

      }

      @media only screen and (min-width: 768px) {
        .list {
          padding: 0;
        }
      }
    `
  }

  set column(value) {
    this._column = value
  }

  get column() {
    return this._column
  }

  set gutter(value) {
    this._gutter = value
  }

  get gutter() {
    return this._gutter
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = ''
  }

  render() {
    this._emptyContent()
    this._updateStyle()

    this._shadowRoot.appendChild(this._style)
    this._shadowRoot.innerHTML += `
      <div class="list">
        <slot></slot>
      </div>
    `

    const listElement = this._shadowRoot.querySelector('.list')

    setTimeout(() => {
      listElement.classList.add('show')
    }, 10)
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'column':
        this.column = newValue
        break
      case 'gutter':
        this.gutter = newValue
        break
    }

    this.render()
  }
}

customElements.define('note-list', NoteList)
