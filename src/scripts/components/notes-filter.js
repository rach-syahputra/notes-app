class NotesFilter extends HTMLElement {
  _shadowRoot = null
  _style = null

  _buttonElements = null
  _archived = false

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
      }

      .filter {
        display: flex;
        overflow: hidden;
        position: relative;
        width: fit-content;
        align-items: center;
        justify-content: space-between;
      }
      
      button {
        background: none;
        border: none;
        color: #474E41;
        font-size: 14px;
        padding: 12px 0;
        width: 120px;
        cursor: pointer;
        font-weight: bold;
        border-radius: 4px;
      }

      .active {
        background-color: #F6761F;
        color: #fff;
        transition: all 0.3s ease-in-out; 
      }
    `
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = ''
  }

  _filterNotes(event, button) {
    this._buttonElements.forEach((btn) => btn.classList.remove('active'))
    button.classList.add('active')

    this.dispatchEvent(new CustomEvent('filterNotes'))
  }

  render() {
    this._emptyContent()
    this._updateStyle()

    this._shadowRoot.appendChild(this._style)
    this._shadowRoot.innerHTML += `
      <div class="filter">
        <button class="active">Unarchived</button>
        <button>Archived</button>
      </div>
    `

    this._buttonElements = this._shadowRoot.querySelectorAll('button')

    this._buttonElements.forEach((button) => {
      button.addEventListener('click', (event) =>
        this._filterNotes(event, button)
      )
    })
  }
}

customElements.define('notes-filter', NotesFilter)
