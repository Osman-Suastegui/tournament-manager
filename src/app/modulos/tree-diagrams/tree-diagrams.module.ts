import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleEliminationTreeComponent } from './single-elimination-tree/single-elimination-tree.component';
import {DragDropModule} from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    SingleEliminationTreeComponent
  ],
  imports: [
    CommonModule,
    DragDropModule
  ],
  exports:[
    SingleEliminationTreeComponent
  ]
})
export class TreeDiagramsModule { }
