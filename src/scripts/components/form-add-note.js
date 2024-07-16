import NotesAPi from '../data/remote/notes-api.js'
import Utils from '../Utils.js'

class FormAddNote extends HTMLElement {
  _shadowRoot = null
  _style = null
  _formElement = null
  _titleInput = null
  _bodyInput = null
  _titleValidationMessage = null
  _bodyValidationMessage = null
  _cancelButtonElement = null

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
        align-self: start;
        width: 96%;
      }

      form {
        display: flex;
        flex-direction: column;
        gap: 16px;
        transform: scale(0.97);
      }

      .show {
        transform: scale(1);
        transition: all .3s ease-out;
      }

      label {
        display: inline-block;
        margin-block-end: 0.5rem;
        font-weight: bold;
      }

      input, textarea {
        border: 2px solid #E6E6E6;
        border-radius: 4px;
        width: 100%;
        width: 96%;
      }

      input:focus-visible, textarea:focus-visible {
        outline: none;
        border: 2px solid #A0A6A5;
      }

      input#title {
        color: #E79B3D;
        font-size: 16px;
        font-weight: bold;
        padding: 8px;
      }

      textarea#body {
        height: 200px;
        padding: 8px;
        font-size: 16px;
      }

      .validation-message {
        color: red;
      }

      .buttons {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      button {
        padding: 12px;
        border-radius: 4px;
        font-weight: bold;
        cursor: pointer;
        width: 100%;
      }

      .add-note {
        background-color: #E79B3D;
        color: #fff;
        border: none;
      }

      .add-note:hover {
        background-color: #bb7c2d;
        transition: all 150ms ease-in-out;
      }

      .cancel {
        border: 1px solid #E79B3D;
        color: #E79B3D;
        background: none;
      }
    `
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = ''
  }

  connectedCallback() {
    this._formElement.addEventListener('submit', (event) =>
      this._addNote(event)
    )

    this._cancelButtonElement.addEventListener('click', (event) =>
      this._cancelAddNote(event)
    )
  }

  disconnectedCallback() {
    this._formElement.removeEventListener('submit', (event) =>
      this._addNote(event)
    )
    this._cancelButtonElement.removeEventListener('click', (event) =>
      this._cancelAddNote(event)
    )
  }

  _validateInput(input, messageElement) {
    if (!input.value) {
      messageElement.textContent = `${input.name.charAt(0).toUpperCase() + input.name.slice(1)} is required.`
      return false
    } else {
      messageElement.textContent = ''
      return true
    }
  }

  _addNote(event) {
    event.preventDefault()

    const isTitleValid = this._validateInput(
      this._titleInput,
      this._titleValidationMessage
    )
    const isBodyValid = this._validateInput(
      this._bodyInput,
      this._bodyValidationMessage
    )

    if (isTitleValid && isBodyValid) {
      const note = {
        title: this._titleInput.value,
        body: this._bodyInput.value,
      }

      this.dispatchEvent(new CustomEvent('noteAdded', { detail: note }))
    }
  }

  _cancelAddNote(event) {
    event.preventDefault()

    this.dispatchEvent(new CustomEvent('addNoteCanceled'))
  }

  render() {
    this._emptyContent()
    this._updateStyle()

    this._shadowRoot.appendChild(this._style)
    this._shadowRoot.innerHTML += `
      <form>
        <div class="form-group">
          <label for="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            required
            minlength="1"
            aria-describedby="titleValidation"
          />
          <p id="titleValidation" class="validation-message" aria-live="polite"></p>
        </div>

        <div class="form-group">
          <label for="body">Body</label>
          <textarea
            type="text"
            id="body"
            name="body"
            required
            minlength="1"
            aria-describedby="bodyValidation"
          ></textarea>
          <p id="bodyValidation" class="validation-message" aria-live="polite"></p>
        </div>

        <div class="buttons">
          <button class="add-note">Add Note</button>
          <button class="cancel">Cancel</button>
        </div>
      </form>
    `
    this._formElement = this._shadowRoot.querySelector('form')
    this._titleInput = this._shadowRoot.querySelector('#title')
    this._bodyInput = this._shadowRoot.querySelector('#body')
    this._titleValidationMessage =
      this._shadowRoot.querySelector('#titleValidation')
    this._bodyValidationMessage =
      this._shadowRoot.querySelector('#bodyValidation')
    this._cancelButtonElement = this._shadowRoot.querySelector('.cancel')

    setTimeout(() => {
      this._formElement.classList.add('show')
    }, 10)

    // validations
    this._titleInput.addEventListener('change', () =>
      this._validateInput(this._titleInput, this._titleValidationMessage)
    )
    this._titleInput.addEventListener('invalid', () =>
      this._validateInput(this._titleInput, this._titleValidationMessage)
    )
    this._titleInput.addEventListener('blur', () =>
      this._validateInput(this._titleInput, this._titleValidationMessage)
    )
    this._bodyInput.addEventListener('change', () =>
      this._validateInput(this._bodyInput, this._bodyValidationMessage)
    )
    this._bodyInput.addEventListener('invalid', () =>
      this._validateInput(this._bodyInput, this._bodyValidationMessage)
    )
    this._bodyInput.addEventListener('blur', () =>
      this._validateInput(this._bodyInput, this._bodyValidationMessage)
    )
  }
}

customElements.define('form-add-note', FormAddNote)
