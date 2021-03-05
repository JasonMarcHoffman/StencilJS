import { Component, h, Prop, State } from '@stencil/core'

@Component({
  tag: 'qs-tooltip-display',
  styleUrl: './tooltip-display.css',
  shadow: true
})

export class TooltipDisplay {

  @State() showToolTip = false

  @Prop() text: string

  onToggleTooltip() {
    this.showToolTip = !this.showToolTip
    console.log('running:', this.showToolTip);
    console.log(this.text);
  }

  render() {
    let tooltipContent: null;
    if (this.showToolTip) {
      tooltipContent = <div id="tooltip-text">{this.text}</div>
    }
    return [
      <slot></slot>,
      <span id="tooltip-icon" onClick={this.onToggleTooltip.bind(this)}> ?</span>,
      tooltipContent
    ]
  }
}