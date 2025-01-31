import { Component, OnInit } from '@angular/core';
class TreeTeamNode {
  public winner: "left" | "right" | null = null;
  constructor(public name: string = '', public left?: TreeTeamNode, public right?: TreeTeamNode) {
    this.name = name;
    this.left = left;
    this.right = right;
  }

}

class Tree {
  static inorder(node?:TreeTeamNode){
    if(!node) return;
    this.inorder(node.left);
    console.log(node.name);
    this.inorder(node.right);
  }
}

@Component({
  selector: 'app-single-elimination-tree',
  templateUrl: './single-elimination-tree.component.html',
  styleUrls: ['./single-elimination-tree.component.css']
})
export class SingleEliminationTreeComponent implements OnInit {
  ngOnInit(): void {
    const x: TreeTeamNode = new TreeTeamNode('team1', new TreeTeamNode('team2', new TreeTeamNode('team3'), new TreeTeamNode('team4')), new TreeTeamNode('team5', new TreeTeamNode('team6'), new TreeTeamNode('team7')));
    Tree.inorder(x);
    console.log(JSON.stringify(x));
  }


}
