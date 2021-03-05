import { Component, h, Prop, State, Element } from '@stencil/core'

import { AV_API_KEY } from '../../global/global'

@Component({
  tag: 'qs-stock-picker',
  styleUrl: './stock-price.css',
  shadow: true
})

export class StockPrice {
  // createing a reference to the inout element
  stockInput: HTMLInputElement

  @Prop() heading: string;
  @State() fetchedPrice: number;
  @Element() el: HTMLElement

  // getting the input event data as an argument
  onFetchStockPrice(event: Event) {
    event.preventDefault();
    // const stockSymbol = (this.el.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement).value
    const stockSymbol = this.stockInput.value
    console.log('submitted', event)
    // send HTTP request
    fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${AV_API_KEY}`
      )
      .then(response => {
        return response.json();
      })
      .then(parsedRes => {
        // by adding a + you convert from string to number
        this.fetchedPrice = +parsedRes['Global Quote']['05. price']
        console.log(this.fetchedPrice);
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    // [] array syntax allows multiple HTML Elements
    return [
      <header>
        <h3>{this.heading}</h3>
      </header>,
      // this form is fetching a stock price based on the symbol
      <form onSubmit={this.onFetchStockPrice.bind(this)}>
        <p><small>eg: AAPL</small></p>
        {/* ref is a stencil feature giving us direct access to the input */}
        <input id="stock-symbol" ref={el => this.stockInput = el}/>
        <button type="submit">Fetch Stock</button>
      </form>,

      <div>
        <p>Price: ${this.fetchedPrice}</p>
      </div>
    ]
  }
}