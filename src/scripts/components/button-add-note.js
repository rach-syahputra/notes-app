class ButtonAddNote extends HTMLElement {
  _shadowRoot = null
  _style = null

  _src = null

  static get observedAttributes() {
    return ['src']
  }

  constructor() {
    super()

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
 
    this.render();
  }

  set src(value) {
    this._src = value;
  }
 
  get src() {
    return this._src;
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
        display: block;
        position: absolute;
        right: 16px;
        bottom: 16px;
      }

      button {
        display: flex;
        align-items: center;
        gap: 6px;
        border: none;
        background: none;
        cursor: pointer;
        margin-left: auto;
      }

      button .img-container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: fit-content;
        padding: 6px 8px;
        border-radius: 999px;
        background-color: #E79B3D;
      }

      button span {
        font-weight: bold;
        color: #E79B3D;
      }

      button .img-container img {
        width: 14px;
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
      <button>
        <div class="img-container">
          <img src="${this.src}">
        </div>
        <span>Add note</span>
      </button>
    `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'src':
        this.src = newValue;
        break;
    }

    this.render()
  }
}

customElements.define('button-add-note', ButtonAddNote)