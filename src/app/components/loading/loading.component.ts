import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  @Input() isLoading = false;
  @Input() hasError = false;

  @Output() tryAggain = new EventEmitter<true>();
}
