class NoteItem extends HTMLElement {
  _shadowRoot = null
  _style = null
  _note = {
    id: 'test',
    title: 'test',
    body: 'test',
    createdAt: 'test'
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
    }
    
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 24px;
    }

    .rounded-brown {
      width: 10px;
      height: 10px;
      border: 3px solid #E79B3D;
      border-radius: 999px;
    }

    .note-date {
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
          <h3>title</h3>
          <div class="rounded-brown"></div>
        </div>
        <p class="note-body">body</p>
        <span class="note-date">date</span>
      </div>
    `
  }
}

customElements.define('note-item', NoteItem)