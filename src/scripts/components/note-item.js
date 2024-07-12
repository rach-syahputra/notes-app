class NoteItem extends HTMLElement {
  _shadowRoot = null
  _style = null
  _note = {
    id: '',
    title: '',
    body: '',
    createdAt: ''
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
      background-color: #F6F6F6;
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
      color: #A0A6A5;
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
        <span class="note-date">${this._note.createdAt}</span>
      </div>
    `
  }
}

customElements.define('note-item', NoteItem)