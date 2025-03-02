import { Input } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent {
  @Input() selected: 1 | 2 | 3 | 4 = 1;
}
