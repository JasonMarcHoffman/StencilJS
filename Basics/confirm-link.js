class ConfirmLink extends HTMLAnchorElement {
  connectedCallback() {
    this.addEventListener('click', event => {
      // confirm is a built in js method, return true/false
      if (!confirm('Do you want to leave?')) {
        event.preventDefault();
      }
    })
  }
}

// when we are extending an existing element in this case the HTMLAnchorElement
// we need to provide a 3rd argument to specify the element
customElements.define('qs-confirm-link', ConfirmLink, { extends: 'a' })