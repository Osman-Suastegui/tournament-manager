import { CommonModule, NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AngularMaterialModule } from 'src/app/modulos/angular-material/angular-material.module';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  imports: [NgClass, AngularMaterialModule, CommonModule],
  standalone: true
})
export class ButtonComponent {
  @Input() text: string = '';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() customClass: string = '';
  @Input() isFullWidth: boolean = false;
  @Input() matIcon: string = '';
  @Input() isDisabled:boolean = false;
}
