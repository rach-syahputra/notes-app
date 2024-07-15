import Utils from '../Utils.js'

class NoteItemDetail extends HTMLElement {
  _shadowRoot = null
  _style = null

  _titlecolor = ''
  _bodycolor = ''
  _datecolor = ''

  _note = {
    id: '',
    title: '',
    body: '',
    createdAt: '',
  }

  static get observedAttributes() {
    return ['titlecolor', 'bodycolor', 'datecolor']
  }

  constructor() {
    super()

    this._shadowRoot = this.attachShadow({ mode: 'open' })
    this._style = document.createElement('style')

    this.render()
  }

  set titlecolor(value) {
    this._titlecolor = value
  }

  get titlecolor() {
    return this._titlecolor
  }

  set bodycolor(value) {
    this._bodycolor = value
  }

  get bodycolor() {
    return this._bodycolor
  }

  set datecolor(value) {
    this._datecolor = value
  }

  get datecolor() {
    return this._datecolor
  }

  set note(value) {
    this._note = value

    this.render()
  }

  get note() {
    return this._note
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
        display: block;
        width: 100%;
      }
      
      .item-detail {
        display: flex;
        flex-direction: column;
      }

      .item-detail .note-title {
        font-size: 24px;
        font-weight: bold;
        color: ${this.titlecolor};
      }

      .item-detail .note-body {
        color: ${this.bodycolor}
      }

      .item-detail .note-date {
        font-size: 14px;
        color: ${this.datecolor};
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
      <div class="item-detail">
        <span class="note-title">${this._note.title}</span>
        <p class="note-body">${this._note.body}</p>
        <span class="note-date">${Utils.formatDate(this._note.createdAt)}</span>
      </div>
    `
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'titlecolor':
        this.titlecolor = newValue
        break
      case 'bodycolor':
        this.bodycolor = newValue
        break
      case 'datecolor':
        this.datecolor = newValue
        break
    }

    this.render()
  }
}

customElements.define('note-item-detail', NoteItemDetail)
