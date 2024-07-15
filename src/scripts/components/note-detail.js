class NoteDetail extends HTMLElement {
  _shadowRoot = null
  _style = null

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
        width: 100%;
      }
      
      .detail {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
      }
    `
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = ''
  }

  render() {
    this._emptyContent()
    this._updateStyle()

    this._shadowRoot.appendChild(this._style)
    this._shadowRoot.innerHTML += `
      <div class="detail">
        <slot></slot>
      </div>
    `
  }
}

customElements.define('note-detail', NoteDetail)
