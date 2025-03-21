import { EventEmitter, Input, Output } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent {

  @Input() selected: number = 1;
  @Output() selectedChange = new EventEmitter<number>();
  onSelectOption(option: number): void {
    this.selected = option;
    this.selectedChange.emit(option);
  }
}
