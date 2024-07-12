class NoteList extends HTMLElement {
  _shadowRoot = null
  _style = null

  _column = 1
  _gutter = 8

  static get observedAttributes() {
    return ['column', 'gutter']
  }

  constructor() {
    super()

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
 
    this.render();
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
      }
    `;
  }

  set column(value) {
    this._column = value
  }

  get column() {
    return this._column;
  }

  set gutter(value) {
    this._gutter = value
  }

  get gutter() {
    return this._gutter;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }
  
  render() {
    this._emptyContent();
    this._updateStyle();
 
    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <div class="list">
        <slot></slot>
      </div>
    `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'column':
        this.column = newValue;
        break;
      case 'gutter':
        this.gutter = newValue;
        break;
    }

    this.render()
  }
}

customElements.define('note-list', NoteList)