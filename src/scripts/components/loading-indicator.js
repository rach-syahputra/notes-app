class LoadingIndicator extends HTMLElement {
  _shadowRoot = null
  _style = null

  constructor() {
    super()

    this._shadowRoot = this.attachShadow({ mode: 'open' })
    this._style = document.createElement('style')

    this.render()
  }

  set fontcolor(value) {
    this._fontcolor = value
  }

  get fontcolor() {
    return this._fontcolor
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = ''
  }

  _udpateStyle() {
    this._style.textContent = `
    :host {
      display: block;
      position: absolute;
      left: 50%;
    }
    
    .container{
        height: 30px;
        width: 30px;
        position: relative;
        animation: spin 1s infinite;
    }

    @keyframes spin{
        100%{
            transform: rotate(360deg);
        }
    }

    .container>div:nth-child(1){
        height: 16px;
        width: 16px;
        background-image: linear-gradient(
            45deg,
            #E79B3D,
            #E79B3D
        );
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 50%;
        animation: move1 1s infinite;
    }

    @keyframes move1{
        50%{
            transform: translate(-10px,-10px) scale(0.3);
        }
    }

    .container>div:nth-child(2){
        height: 10px;
        width: 10px;
        background-image: linear-gradient(
            45deg,
            #E79B3D,
            #E79B3D
        );
        position: absolute;
        top: 0;
        right: 0;
        border-radius: 50%;
        animation: move2 1s infinite;
    }

    @keyframes move2{
        50%{
            transform: translate(0px,-5px) scale(0.55);
        }
    }

    .container>div:nth-child(3){
        height: 16px;
        width: 16px;
        background-image: linear-gradient(
            45deg,
            #E79B3D,
            #E79B3D
        );
        position: absolute;
        bottom: 0;
        right: 0;
        border-radius: 50%;
        animation: move3 1s infinite;
    }

    @keyframes move3{
        50%{
            transform: translate(10px,10px) scale(0.3);
        }
    }

    .container>div:nth-child(4){
        height: 10px;
        width: 10px;
        background-image: linear-gradient(
            45deg,
            #E79B3D,
            #E79B3D
        );
        position: absolute;
        bottom: 0;
        left: 0;
        border-radius: 50%;
        animation: move4 1s infinite;
    }

    @keyframes move4{
        50%{
            transform: translate(0px, 5px) scale(0.55);
        }
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
      <div class="container">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    `
  }
}
customElements.define('loading-indicator', LoadingIndicator)
