class NoteControls extends HTMLElement {
  _shadowRoot = null
  _style = null

  _archived = false

  _archiveButtonElement = null
  _removeButtonElement = null

  static get observedAttributes() {
    return ['archivesrc', 'unarchivesrc', 'removesrc']
  }

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

  set removesrc(value) {
    this._removesrc = value
  }

  get removesrc() {
    return this._removesrc
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

  _archiveNote(event) {
    this.dispatchEvent(new CustomEvent('archiveNote'))
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

    this._archiveButtonElement.addEventListener('click', (event) =>
      this._archiveNote(event)
    )
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'removesrc':
        this.removesrc = newValue
        break
    }

    this.render()
  }
}

customElements.define('note-controls', NoteControls)
