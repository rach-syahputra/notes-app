class NoteItemDetail extends HTMLElement {
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

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
 
    this.render();
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
        color: #E79B3D;
      }

      .item-detail .note-date {
        font-size: 14px;
        color: #A0A6A5;
      }
    `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }
  
  render() {
    this._emptyContent();
    this._updateStyle();
 
    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <div class="item-detail">
        <span class="note-title">${this._note.title}</span>
        <p class="note-body">${this._note.body}</p>
        <span class="note-date">${this._note.createdAt}</span>
      </div>
    `;
  }
}

customElements.define('note-item-detail', NoteItemDetail)