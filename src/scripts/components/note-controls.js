class NoteControls extends HTMLElement {
  _shadowRoot = null
  _style = null

  _archived = false

  _archiveButtonElement = null
  _removeButtonElement = null

  constructor() {
    super()

    this._shadowRoot = this.attachShadow({ mode: 'open' })
    this._style = document.createElement('style')

    this.render()
  }

  set archived(value) {
    this._archived = value

    this.render()
  }

  get archived() {
    return this._archived
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
        display: block;
        width: 100%;
      }
      
      .controls {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-top: 24px;
      }

      button {
        background: none;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        cursor: pointer;
      }

      .archive-button img,
      .remove-button img {
        width: 21px;
      }
    `
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = ''
  }

  disconnectedCallback() {
    this._archiveButtonElement.removeEventListener('click', (event) =>
      this._archiveNote(event)
    )
  }

  _archiveNote() {
    this.dispatchEvent(new CustomEvent('archiveNote'))
  }

  _removeNote() {
    this.dispatchEvent(new CustomEvent('removeNote'))
  }

  render() {
    this._emptyContent()
    this._updateStyle()

    this._shadowRoot.appendChild(this._style)
    this._shadowRoot.innerHTML += `
      <div class="controls">
        <button class="archive-button">
          <img src=${this.archived ? 'archived.png' : 'archive.png'}>
        </button>
        <button class="remove-button">
          <img src="trash.png">
        </button>
      </div>
    `

    this._archiveButtonElement =
      this._shadowRoot.querySelector('.archive-button')
    this._removeButtonElement = this._shadowRoot.querySelector('.remove-button')

    this._archiveButtonElement.addEventListener('click', () =>
      this._archiveNote()
    )
    this._removeButtonElement.addEventListener('click', () =>
      this._removeNote()
    )
  }
}

customElements.define('note-controls', NoteControls)
