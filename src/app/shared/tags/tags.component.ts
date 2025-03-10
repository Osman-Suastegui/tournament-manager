import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from 'src/app/modulos/angular-material/angular-material.module';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [CommonModule,AngularMaterialModule],
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent<T> {

  @Input() tags:  T[]  = [];  // Now using a generic type for tags
  @Output() tagsChange = new EventEmitter<T[]>();
  @Input() title: string = 'Tags';
  @Input() minTags: number = 0;
  @Input() displayTag: (tag: T) => string = (tag: T) => tag as string
  @Input() errorMessage: string = 'Please enter a valid tag';

  // Method to get the display value for a tag using the provided function
  getTagDisplayValue(tag: T): string {
    return this.displayTag(tag);
  }

  removeTag(tag: T) {
    console.log('Removing tag:', tag);
    const updatedTags = this.tags?.filter(t => t !== tag);
    this.tagsChange.emit(updatedTags);
  }

}
