import Utils from "../Utils.js";

class FormAddNote extends HTMLElement {
  _shadowRoot = null
  _style = null

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
        align-self: start;
        width: 96%;
      }

      form {
        display: flex;
        flex-direction: column;
        gap: 16px;
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
        font-size: 21px;
        font-weight: bold;
        padding: 8px;
      }

      textarea#body {
        height: 200px;
        padding: 8px;
      }

      .validation-message {
        color: red;
      }

      button {
        background-color: #E79B3D;
        padding: 12px;
        color: #fff;
        border: none;
        border-radius: 4px;
        font-weight: bold;
        cursor: pointer;
        width: 100%;
      }
    `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  _validateInput(input, messageElement) {
    if (!input.value) {
      messageElement.textContent = `${input.name.charAt(0).toUpperCase() + input.name.slice(1)} is required.`;
      return false;
    } else {
      messageElement.textContent = '';
      return true;
    }
  }

  _attachEventListeners() {
    const form = this._shadowRoot.querySelector('form');
    const titleInput = this._shadowRoot.querySelector('#title');
    const bodyInput = this._shadowRoot.querySelector('#body');
    const titleValidationMessage = this._shadowRoot.querySelector('#titleValidation');
    const bodyValidationMessage = this._shadowRoot.querySelector('#bodyValidation');

    titleInput.addEventListener('change', () => this._validateInput(titleInput, titleValidationMessage));
    titleInput.addEventListener('invalid', () => this._validateInput(titleInput, titleValidationMessage));
    titleInput.addEventListener('blur', () => this._validateInput(titleInput, titleValidationMessage));
    bodyInput.addEventListener('input', () => this._validateInput(bodyInput, bodyValidationMessage));
    bodyInput.addEventListener('invalid', () => this._validateInput(bodyInput, bodyValidationMessage));
    bodyInput.addEventListener('blur', () => this._validateInput(bodyInput, bodyValidationMessage));

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const isTitleValid = this._validateInput(titleInput, titleValidationMessage);
      const isBodyValid = this._validateInput(bodyInput, bodyValidationMessage);

      if (isTitleValid && isBodyValid) {
        const noteDetailContainerElement = document.querySelector('#noteDetailContainer')
        const formAddNoteElement = noteDetailContainerElement.querySelector('form-add-note')
        
        if (formAddNoteElement) {
          formAddNoteElement.remove()
          
          const noteDetailElement = noteDetailContainerElement.querySelector('#noteDetail')
          const buttonAddNoteElement = noteDetailContainerElement.querySelector('button-add-note')

          Utils.showElement(noteDetailElement, 'flex')
          Utils.showElement(buttonAddNoteElement)
        }
        
      }
    });
  }
  
  render() {
    this._emptyContent();
    this._updateStyle();
 
    this._shadowRoot.appendChild(this._style);
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

        <button>Add Note</button>
      </form>
    `;

    this._attachEventListeners();
  }
}

customElements.define('form-add-note', FormAddNote)