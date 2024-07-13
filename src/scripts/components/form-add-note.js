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
        width: 100%;
        border: 2px solid #E6E6E6;
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
      </form>
    `;
  }
}

customElements.define('form-add-note', FormAddNote)