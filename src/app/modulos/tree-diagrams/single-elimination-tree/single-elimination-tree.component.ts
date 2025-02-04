import { AfterViewInit, Component, OnInit, ViewChild, Renderer2, ElementRef } from "@angular/core";
class TreeTeamNode {
  public winner: "left" | "right" | null = null;
  constructor(public teamName1: string = "", public teamName2: string = "", public left?: TreeTeamNode, public right?: TreeTeamNode) {
    this.teamName1 = teamName1;
    this.teamName2 = teamName2;
    this.left = left;
    this.right = right;
  }

}

class Tree {
  static inorder(node?: TreeTeamNode) {
    if (!node) return;
    console.log(node.teamName1 + " vs " + node.teamName2);
    this.inorder(node.left);
    this.inorder(node.right);
  }

  static getDepth(node: TreeTeamNode | undefined): number {
    if (!node) return 0;
    return 1 + this.getDepth(node.left);
  }
}

@Component({
  selector: "app-single-elimination-tree",
  templateUrl: "./single-elimination-tree.component.html",
  styleUrls: ["./single-elimination-tree.component.css"],

})
export class SingleEliminationTreeComponent implements OnInit, AfterViewInit {
  @ViewChild("tree", { static: false }) tree!: ElementRef;
  constructor(private renderer: Renderer2) { }

  private WIDTH_NODE = 153;
  private HEIGHT_NODE = 32;
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const tree1 = new TreeTeamNode(
      "", "",
      new TreeTeamNode(
        "", "",
        new TreeTeamNode("Team A", "Team B"),
        new TreeTeamNode("Team C", "Team D")
      ),
      new TreeTeamNode(
        "", "",
        new TreeTeamNode("Team E", "Team F"),
        new TreeTeamNode("Team G", "Team H")
      )
    );
    const tree2 = new TreeTeamNode(
      '', '',
      new TreeTeamNode(
        'Team C', 'Team G',
        new TreeTeamNode(
          'Team A', 'Team C',
          new TreeTeamNode('Team A', 'Team B'),
          new TreeTeamNode('Team C', 'Team D')
        ),
        new TreeTeamNode(
          'Team E', 'Team G',
          new TreeTeamNode('Team E', 'Team F'),
          new TreeTeamNode('Team G', 'Team H')
        )
      ),
      new TreeTeamNode(
        '', '',
        new TreeTeamNode(
          '', '',
          new TreeTeamNode('Team I', 'Team J'),
          new TreeTeamNode('Team K', 'Team L')
        ),
        new TreeTeamNode(
          '', '',
          new TreeTeamNode('Team M', 'Team N'),
          new TreeTeamNode('Team O', 'Team P')
        )
      )
    );

    Tree.inorder(tree1);
    this.createTreeHtml(tree2);
  }

  onHover(teamName: string, isHovering: boolean) {
    const nodes = document.querySelectorAll(`.tree-node-team-${teamName}`);

    nodes.forEach((node) => {
      if (isHovering) {
        this.renderer.addClass(node, "active");  // Add hover effect
      } else {
        this.renderer.removeClass(node, "active");  // Remove hover effect
      }
    });
  }


  createTreeHtml(root: TreeTeamNode | undefined, x: number = window.innerWidth / 2 , y: number = 400): void {
    if (!root) return;
    const TREE_DEPTH = Tree.getDepth(root);
    // espacio entre nodos horizontal
    const SPACE_BETWEEN_NODES = 200;
    let currLevel = 1;
    const queue: { node: TreeTeamNode, isLeft: boolean | null, x: number, y: number, diffY: number }[] = [
      { node: root, isLeft: null, x, y, diffY: 0 }
    ];

    while (queue.length > 0) {
      const l = queue.length;

      for (let i = 0; i < l; i++) {
        const { node, isLeft, x, y, diffY } = queue.shift()!;

        const divTeam1 = this.createTreeNodeHtml(node.teamName1 || " vs ", x, y, true);
        const divTeam2 = this.createTreeNodeHtml(node.teamName2 || " vs ", x, y + this.HEIGHT_NODE, false);

        const line = this.renderer.createElement("div");
        line.classList.add("line");
        line.style.top = `${100}%`;
        const lineWidth = Math.round((SPACE_BETWEEN_NODES - this.WIDTH_NODE) / 2);
        line.style.width = `${lineWidth}px`;
        line.style.left = `${-lineWidth}px`;
        this.renderer.appendChild(this.tree.nativeElement, divTeam1);

        // IF WE ARE NOT IN THE LAST LEVEL
        if (TREE_DEPTH !== currLevel) {
          this.renderer.appendChild(divTeam1, line);
        }

        const line2 = this.renderer.createElement("div");
        line2.classList.add("line");
        line2.style.top = `${100}%`;
        line2.style.width = `${lineWidth}px`;
        line2.style.right = `${-lineWidth}px`;

        this.renderer.appendChild(this.tree.nativeElement, divTeam1);
        this.renderer.appendChild(this.tree.nativeElement, divTeam2);

        if (isLeft) {
          line2.style.height = `${diffY}px`;
        }

        // IF WE ARE NOT IN THE FIRST LEVEL WE ADD THE LINE
        if (currLevel !== 1) {
          this.renderer.appendChild(divTeam1, line2);
        }

        const containerHeight = window.innerHeight;           // total height of the browser
        const drawingHeight = containerHeight * 0.8;            // use 80% of the height for the tree
        const availableSpace = drawingHeight / Math.pow(2, currLevel); // space available for this level's subtree
        const offset = availableSpace / 2;                      // half the space for positioning children
        const leftPosYNode = y - offset;
        const rightPosYNode = y + offset;
        const diff = rightPosYNode - leftPosYNode;

        // Add children to the queue
        if (node.left) {
          queue.push({ node: node.left, isLeft: true, x: x - SPACE_BETWEEN_NODES, y: leftPosYNode, diffY: diff });
        }
        if (node.right) {
          queue.push({ node: node.right, isLeft: false, x: x - SPACE_BETWEEN_NODES, y: rightPosYNode, diffY: diff });
        }
      }
      currLevel++;
    }
  }

  createTreeNodeHtml(teamName: string, x: number, y: number, hasBorders: boolean): HTMLDivElement {
    // remove spaces teamnAMNE
    teamName = teamName.replace(/\s/g, "");
    const div = this.renderer.createElement("div");
    div.classList.add("tree-node-team", `tree-node-team-${teamName}`);

    div.style.top = `${y}px`;
    div.style.left = `${x}px`;
    div.style.width = `${this.WIDTH_NODE}px`;
    if (!hasBorders) {
      div.style.borderTop = "none";
    }
    div.innerHTML = teamName;
    this.renderer.listen(div, 'mouseover', () => this.onHover(teamName, true));  // Mouse enters
    this.renderer.listen(div, 'mouseout', () => this.onHover(teamName, false));  // Mouse leaves
    return div;

  }
}
