import { AfterViewInit, Component, OnInit, ViewEncapsulation, ViewChild, Renderer2, ElementRef } from '@angular/core';
class TreeTeamNode {
  public winner: "left" | "right" | null = null;
  constructor(public name: string = '', public left?: TreeTeamNode, public right?: TreeTeamNode) {
    this.name = name;
    this.left = left;
    this.right = right;
  }

}

class Tree {
  static inorder(node?: TreeTeamNode) {
    if (!node) return;
    console.log(node.name);
    this.inorder(node.left);
    this.inorder(node.right);
  }
}

@Component({
  selector: 'app-single-elimination-tree',
  templateUrl: './single-elimination-tree.component.html',
  styleUrls: ['./single-elimination-tree.component.css'],

})
export class SingleEliminationTreeComponent implements OnInit, AfterViewInit {
  @ViewChild('tree', { static: false }) tree!: ElementRef;
  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    const root: TreeTeamNode = new TreeTeamNode(
      "Team1",
      new TreeTeamNode(
        "Team2",
        new TreeTeamNode(
          "Team4",
          new TreeTeamNode("Team8"),
          new TreeTeamNode("Team9")
        ),
        new TreeTeamNode(
          "Team5",
          new TreeTeamNode("Team10"),
          new TreeTeamNode("Team11")
        )
      ),
      new TreeTeamNode(
        "Team3",
        new TreeTeamNode(
          "Team6",
          new TreeTeamNode("Team12"),
          new TreeTeamNode("Team13")
        ),
        new TreeTeamNode(
          "Team7",
          new TreeTeamNode("Team14"),
          new TreeTeamNode("Team15")
        )
      )
    );

    const root2: TreeTeamNode = new TreeTeamNode(
      "Team1",
      new TreeTeamNode(
        "Team2",
        new TreeTeamNode(
          "Team4",
          new TreeTeamNode(
            "Team8",
            new TreeTeamNode("Team16"),
            new TreeTeamNode("Team17")
          ),
          new TreeTeamNode(
            "Team9",
            new TreeTeamNode("Team18"),
            new TreeTeamNode("Team19")
          )
        ),
        new TreeTeamNode(
          "Team5",
          new TreeTeamNode(
            "Team10",
            new TreeTeamNode("Team20"),
            new TreeTeamNode("Team21")
          ),
          new TreeTeamNode(
            "Team11",
            new TreeTeamNode("Team22"),
            new TreeTeamNode("Team23")
          )
        )
      ),
      new TreeTeamNode(
        "Team3",
        new TreeTeamNode(
          "Team6",
          new TreeTeamNode(
            "Team12",
            new TreeTeamNode("Team24"),
            new TreeTeamNode("Team25")
          ),
          new TreeTeamNode(
            "Team13",
            new TreeTeamNode("Team26"),
            new TreeTeamNode("Team27")
          )
        ),
        new TreeTeamNode(
          "Team7",
          new TreeTeamNode(
            "Team14",
            new TreeTeamNode("Team28"),
            new TreeTeamNode("Team29")
          ),
          new TreeTeamNode(
            "Team15",
            new TreeTeamNode("Team30"),
            new TreeTeamNode("Team31")
          )
        )
      )
    );

    Tree.inorder(root);
    this.createTreeHtml(root2)
  }

  clickNode(name:string){
    console.log(name)
    console.log('click')
  }
  createTreeHtml(node: TreeTeamNode | undefined, x: number = window.innerWidth / 1.5, y: number = 400): void {
    if (!node) return;
    const WIDTH_NODE = 153
    // espacio entre nodos horizontal
    const SPACE_BETWEEN_NODES = 250;
    let level = 1;
    const queue: { node: TreeTeamNode, parent: TreeTeamNode | null, isLeft: boolean | null, x: number, y: number, diffY: number }[] = [
      { node, parent: null, isLeft: null, x, y, diffY: 0 }
    ];

    while (queue.length > 0) {
      const l = queue.length;

      for (let i = 0; i < l; i++) {
        const { node, parent, isLeft, x, y, diffY } = queue.shift()!;
        const div = this.renderer.createElement('div');

        div.classList.add('tree-node-team');
        div.style.top = `${y}px`;
        div.style.width = `${WIDTH_NODE}px`;
        div.innerHTML = node.name;
        div.addEventListener('click', () => this.clickNode(node.name))

        let parentX = x;

        if (parent) {
          div.style.left = `${parentX}px`;
        } else {
          // Root node stays centered
          div.style.left = `${x}px`;
        }

        const line = this.renderer.createElement('div');
        line.classList.add('line');
        line.style.top = `${50}%`
        const lineWidth = Math.round((SPACE_BETWEEN_NODES - WIDTH_NODE) / 2)
        line.style.width = `${lineWidth}px`;
        line.style.left = `${-lineWidth}px`;
        this.renderer.appendChild(this.tree.nativeElement, div);

        if(level == 5){
          line.style.width = `0px`;
        }
        this.renderer.appendChild(div, line);

        const line2 = this.renderer.createElement('div');
        line2.classList.add('line');
        line2.style.top = `${50}%`
        line2.style.width = `${lineWidth}px`;
        line2.style.right = `${-lineWidth}px`;
        this.renderer.appendChild(this.tree.nativeElement, div);

        if (isLeft) {
          line2.style.height = `${diffY}px`;
        }
        this.renderer.appendChild(div, line2);
        let leftPosYNode = y - (180 / level);
        let rightPosYNode = y + (180 / level);
        if(level == 4){
          leftPosYNode += 30
          rightPosYNode -= 30
        }
        if(level == 3) {
          leftPosYNode += 15
          rightPosYNode -= 15
        }

        let diff = rightPosYNode - leftPosYNode;
        // Add children to the queue
        if (node.left) {

          queue.push({ node: node.left, parent: node, isLeft: true, x: parentX - SPACE_BETWEEN_NODES, y: leftPosYNode, diffY: diff });
        }
        if (node.right) {
          queue.push({ node: node.right, parent: node, isLeft: false, x: parentX - SPACE_BETWEEN_NODES, y: rightPosYNode, diffY: diff });
        }
      }
      level++;
    }
  }
}
