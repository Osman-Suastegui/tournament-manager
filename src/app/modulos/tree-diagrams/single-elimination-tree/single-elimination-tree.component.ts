import { AfterViewInit, Component, OnInit, ViewChild, Renderer2, ElementRef, Input } from "@angular/core";
import { Match } from "./test";
import { SingleEliminationTreeService } from "../tree-services/single-elimination-tree.service";
import { TreeTeamNode } from "../tree.model";

@Component({
  selector: "app-single-elimination-tree",
  templateUrl: "./single-elimination-tree.component.html",
  styleUrls: ["./single-elimination-tree.component.css"],

})
export class SingleEliminationTreeComponent implements OnInit, AfterViewInit {
  @ViewChild("tree") tree!: ElementRef;
  @Input() matches: Match[] = [];

  constructor(private renderer: Renderer2,
    private treeSingleElimination: SingleEliminationTreeService
  ) { }

  private WIDTH_NODE = 147;
  private HEIGHT_NODE = 22;
  private SPACE_BETWEEN_NODES = 200;
  ngOnInit(): void {
    console.log(this.matches);
  }

  ngAfterViewInit(): void {
    const TREE_DEPTH = this.getMaxNumberRounds(this.matches);
    const root: TreeTeamNode | undefined = this.treeSingleElimination.createBinaryTreeWithMatches(this.matches, TREE_DEPTH);
    const x = (TREE_DEPTH - 1) * 147 + ((TREE_DEPTH - 1) * (this.SPACE_BETWEEN_NODES - this.WIDTH_NODE)) + 30;
    this.createTreeHtml(root, x);
  }

  getMaxNumberRounds(matches: Match[]): number {
    let maxRound = 0;
    matches.forEach(match => {
      if (!match.round) return;
      maxRound = Math.max(maxRound, match.round);

    });
    return maxRound;
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

  createTreeHtml(root: TreeTeamNode | undefined, x: number = 1000, y: number = 350): void {
    if (!root) return;
    // espacio entre nodos horizontal
    let currLevel = 1;
    const queue: { node: TreeTeamNode, isLeft: boolean | null, x: number, y: number, diffY: number, hasSibling: boolean }[] = [
      { node: root, isLeft: null, x, y, diffY: 0, hasSibling: false }
    ];

    while (queue.length > 0) {
      const l = queue.length;

      for (let i = 0; i < l; i++) {
        let { node, isLeft, x, y, diffY, hasSibling } = queue.shift()!;

        if (hasSibling) {
          y += 15;
          diffY -= 30;
        }
        const divTeam1 = this.createTreeNodeHtml(node.match?.team1.id || "vs", node.match?.team1.name || "vs", x, y, true);
        const divTeam2 = this.createTreeNodeHtml(node.match?.team2.id || "vs", node.match?.team2.name || "vs", x, y + this.HEIGHT_NODE, false);

        const line = this.renderer.createElement("div");
        line.classList.add("line");
        line.style.top = `${100}%`;
        const lineWidth = Math.round((this.SPACE_BETWEEN_NODES - this.WIDTH_NODE) / 2);
        line.style.width = `${lineWidth}px`;
        line.style.left = `${-lineWidth}px`;
        this.renderer.appendChild(this.tree.nativeElement, divTeam1);

        if (node.left || node.right) {
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
          line2.style.height = `${diffY / 2}px`;
        } else {
          line2.style.borderTop = "none";
          line2.style.borderBottom = "1px solid #ccc";
          line2.style.top = `-${diffY / 2 - this.HEIGHT_NODE}px`;
          line2.style.height = `${diffY / 2}px`;
        }

        // IF WE ARE NOT IN THE FIRST LEVEL WE ADD THE LINE
        if (currLevel !== 1) {
          this.renderer.appendChild(divTeam1, line2);
        }

        const containerHeight = 900;           // total height of the browser
        const drawingHeight = containerHeight * 0.8;            // use 80% of the height for the tree
        const availableSpace = drawingHeight / Math.pow(2, currLevel); // space available for this level's subtree
        const offset = availableSpace / 2;                      // half the space for positioning children
        const leftPosYNode = y - offset;
        const rightPosYNode = y + offset;
        const diff = rightPosYNode - leftPosYNode;

        // Add children to the queue
        if (node.left) {
          queue.push({ node: node.left, isLeft: true, x: x - this.SPACE_BETWEEN_NODES, y: leftPosYNode, diffY: diff, hasSibling: !node.right });
        }
        if (node.right) {
          queue.push({ node: node.right, isLeft: false, x: x - this.SPACE_BETWEEN_NODES, y: rightPosYNode, diffY: diff, hasSibling: !node.left });
        }
      }
      currLevel++;
    }
  }

  createTreeNodeHtml(id: string, teamName: string, x: number, y: number, hasBorders: boolean): HTMLDivElement {

    const div = this.renderer.createElement("div");
    div.classList.add("tree-node-team", `tree-node-team-${id}`);

    div.style.top = `${y}px`;
    div.style.left = `${x}px`;
    div.style.width = `${this.WIDTH_NODE}px`;
    div.style.height = `${this.HEIGHT_NODE}px`;
    div.style.fontSize = "12px";

    if (!hasBorders) {
      div.style.borderTop = "none";
    }
    div.innerHTML = teamName;
    this.renderer.listen(div, "mouseover", () => this.onHover(id, true));  // Mouse enters
    this.renderer.listen(div, "mouseout", () => this.onHover(id, false));  // Mouse leaves
    return div;

  }
}
