import Utils from '../Utils.js'

class NoteItem extends HTMLElement {
  _shadowRoot = null
  _style = null

  _bgcolor = ''
  _fontcolor = ''
  _note = {
    id: '',
    title: '',
    body: '',
    createdAt: '',
  }

  static get observedAttributes() {
    return ['bgcolor', 'fontcolor']
  }

  constructor() {
    super()

    this._shadowRoot = this.attachShadow({ mode: 'open' })
    this._style = document.createElement('style')

    this.render()
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = ''
  }

  set bgcolor(value) {
    this._bgcolor = value
  }

  get bgcolor() {
    return this._bgcolor
  }

  set fontcolor(value) {
    this._fontcolor = value
  }

  get fontcolor() {
    return this._fontcolor
  }

  set note(value) {
    this._note = value

    this.render()
  }

  get note() {
    return this._note
  }

  _udpateStyle() {
    this._style.textContent = `
    :host {
      display: block;
      overflow: hidden;
    }

    .item {
      display: flex;
      flex-direction: column;
      padding: 8px;
      border-radius: 6px;
      background-color: ${this.bgcolor};
      color: ${this.fontcolor};
    }
    
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 16px;
    }

    .rounded-brown {
      width: 10px;
      height: 10px;
      border: 3px solid #E79B3D;
      border-radius: 999px;
    }

    .note-date {
      font-size: 14px;
      color: ${this.fontcolor.toLowerCase() !== '#ffffff' ? '#A0A6A5' : this.fontcolor};
      text-align: right;
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
      <div class="item">
        <div class="header">
          <h4>${this._note.title}</h4>
          <div class="rounded-brown"></div>
        </div>
        <p class="note-body">${this._note.body}</p>
        <span class="note-date">${Utils.formatDate(this._note.createdAt)}</span>
      </div>
    `
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'bgcolor':
        this.bgcolor = newValue
        break
      case 'fontcolor':
        this.fontcolor = newValue
        break
    }

    this.render()
  }
}

customElements.define('note-item', NoteItem)
