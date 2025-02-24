import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  imports:[NgClass],
  standalone: true
})
export class ButtonComponent {
  @Input() text: string = '';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() customClass: string = '';
  @Input() isFullWidth: boolean = false;

}
