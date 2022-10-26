import { Component, Input } from '@angular/core';

declare var Plotly: any;

@Component({
  selector: 'app-sunburst',
  templateUrl: './sunburst.component.html',
  styleUrls: ['./sunburst.component.scss']
})
export class SunburstComponent {
  private _data?: Record<string, any>[];
  private _layout?: Record<string, any>;

  @Input() set data(value: Record<string, any>[]) {
    this._data = value;
    Plotly.react('sunburst', this._data, this._layout);
  };

  @Input() set layout(value: Record<string, any>) {
    this._layout = value;
    Plotly.react('sunburst', this._data, this._layout);
  }

}
