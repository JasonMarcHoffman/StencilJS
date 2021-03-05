import { Component, h, Method, Prop, State } from '@stencil/core';

@Component({
  tag: 'qs-side-drawer',
  styleUrl: './side-drawer.css',
  shadow: true
})

export class SideDrawer {
  // STATE
  @State() showContactInfo = false

  // PROPS
  // props are immutable* and can not be changed from within the component
  @Prop({ reflect: true }) title: string
  @Prop({ reflect: true, mutable: true }) opened: boolean

  // METHODS
  onCloseDrawer() {
    this.opened = false
  }

  onContentChange(content: string) {
    this.showContactInfo = (content === 'contact')
  }

  @Method() // allows us to access the method from anywhere
  open() {
    this.opened = true
  }

  render() {
    let mainContent = <slot></slot>;
    if (this.showContactInfo) {
      mainContent = (
        <div class="contact-info">
          <h2>Contact Info</h2>
          <p>call us today</p>
          <ul>
            <li>Phone: 040</li>
            <li>Email: @mail</li>
          </ul>
        </div>
      )
    }

    return [
      <div class="backdrop" onClick={this.onCloseDrawer.bind(this)}/>,
      <aside>

        <header>
          <h1>{this.title}</h1>
          <button onClick={this.onCloseDrawer.bind(this)}>X</button>
        </header>

        <section id="tabs">
          <button 
            class={!this.showContactInfo ? 'active' : ''}
            onClick={this.onContentChange.bind(this, 'nav')}
          >Navigation</button>
          <button 
            class={this.showContactInfo ? 'active' : ''} 
            onClick={this.onContentChange.bind(this, 'contact')}
          >Contact</button>
        </section>

        <main>
          {mainContent}
        </main>

      </aside>
    ] ;
  }
}

