class Tooltip extends HTMLElement {
  constructor() {
    super();
    // creating an undefined container initially
    this._tooltipContainer;
    this._tooltipText = 'default text when none is provided'
    // setting up the shadow dom... 
    this.attachShadow({ mode: 'open' })
    // acts the same as template tags in html
    // the use of backticks allows multiline html content
    this.shadowRoot.innerHTML = `
      <style>
        div {
          background-color: darkgrey;
          color: white;
          position: absolute;
          z-index: 10;
          cursor: pointer;
          padding: 8px;
        }
      </style>
      <slot></slot>
      <span> (?)</span>
    `
  }

  // fires when a component is inserted into the DOM
  connectedCallback() {
    if (this.hasAttribute('text')) {
      this._tooltipText = this.getAttribute('text');
    }
    const toolTipIcon = this.shadowRoot.querySelector('span')
    toolTipIcon.addEventListener('mouseenter', this._showTooltip.bind(this))
    toolTipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this))
    this.shadowRoot.appendChild(toolTipIcon)
    this.style.postion = 'relative'
  }

  // the _ represents a method only accessible in this class
  // telling a user that you should not use this method from outside
  _showTooltip() {
    this._tooltipContainer = document.createElement('div')
    this._tooltipContainer.textContent = this._tooltipText
    this.shadowRoot.appendChild(this._tooltipContainer)
  }

  _hideTooltip() {
    this.shadowRoot.removeChild(this._tooltipContainer)
  }
}

customElements.define('qs-tooltip', Tooltip)