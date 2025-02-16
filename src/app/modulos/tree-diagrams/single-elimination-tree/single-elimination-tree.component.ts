import { AfterViewInit, Component, OnInit, ViewChild, Renderer2, ElementRef, Input } from "@angular/core";
import { Match } from "./test";
import { MatchService } from "src/app/services/match.service";
class TreeTeamNode {
  public winner: "left" | "right" | null = null;
  constructor(public teamName1: string = "", public teamName2: string = "", public left?: TreeTeamNode, public right?: TreeTeamNode, public idParent?: string, public id?: string) {
    this.teamName1 = teamName1;
    this.teamName2 = teamName2;
    this.left = left;
    this.right = right;
    this.idParent = idParent
    this.id = id;
  }

}

class Tree {
  static inorder(node?: TreeTeamNode) {
    if (!node) return;
    console.log(node.teamName1 + " vs " + node.teamName2);
    this.inorder(node.left);
    this.inorder(node.right);
  }

  static createFullBinaryTree(depth: number, prev: string | null, matches: Match[]): TreeTeamNode | undefined {
    if (depth <= 0 || !prev) return undefined;

    // Find the match at the current level
    const match = matches.find(m => m.id === prev);
    if (!match) return undefined;

    // Find previous matches that lead to this one
    const matchesLevel = matches.filter(m => m.next === match.id);
    matchesLevel.sort((a, b) => parseInt(a.id) - parseInt(b.id))

    // Left and right children (from previous round)
    const leftChild = matchesLevel.length > 0 ? this.createFullBinaryTree(depth - 1, matchesLevel[0].id, matches) : undefined;
    const rightChild = matchesLevel.length > 1 ? this.createFullBinaryTree(depth - 1, matchesLevel[1].id, matches) : undefined;
    let newNode: TreeTeamNode = new TreeTeamNode()
    console.log("MATCH ", match)
    console.log(leftChild)
    console.log(rightChild)
    if (leftChild != undefined) {
      if (leftChild.teamName1 == match.team1?.name) {
        newNode.teamName1 = match.team1?.name
      }
      if (leftChild.teamName1 == match.team2?.name) {
        newNode.teamName1 = match.team2?.name
      }
      if (leftChild.teamName2 == match.team2?.name) {
        newNode.teamName1 = match.team2?.name
      }

      if (leftChild.teamName2 == match.team1?.name) {
        newNode.teamName1 = match.team1?.name
      }
    } else {
      newNode.teamName1 = match.team1?.name
    }
    if (rightChild != undefined) {
      if (rightChild.teamName1 == match.team1?.name) {
        newNode.teamName2 = match.team1?.name
      }
      if (rightChild.teamName1 == match.team2?.name) {
        newNode.teamName2 = match.team2?.name
      }
      if (rightChild.teamName2 == match.team2?.name) {
        newNode.teamName2 = match.team2?.name
      }

      if (rightChild.teamName2 == match.team1?.name) {
        newNode.teamName2 = match.team1?.name
      }
    } else {
      newNode.teamName2 = match.team2?.name
    }
    if (!leftChild && !rightChild) {
      return new TreeTeamNode(match.team1?.name, match.team2?.name, leftChild, rightChild);

    }
    newNode.left = leftChild;
    newNode.right = rightChild
    return newNode
  }

  static createFullBinaryTreeWithMatches(matches: Match[], depth: number): TreeTeamNode | undefined {
    const rootMatch = matches.find(m => m.round === 1); // Find the final match
    if (rootMatch) {
      const tree = this.createFullBinaryTree(depth, rootMatch.id, matches);
      console.log("Binary Tree:", tree);
      return tree;
    }
    return undefined

  }

}

@Component({
  selector: "app-single-elimination-tree",
  templateUrl: "./single-elimination-tree.component.html",
  styleUrls: ["./single-elimination-tree.component.css"],

})
export class SingleEliminationTreeComponent implements OnInit, AfterViewInit {
  @ViewChild("tree") tree!: ElementRef;
  @Input() matches: Match[] = []

  constructor(private renderer: Renderer2, private matchService: MatchService) { }

  private WIDTH_NODE = 147;
  private HEIGHT_NODE = 22;
  private SPACE_BETWEEN_NODES = 200;
  ngOnInit(): void {
    console.log(this.matches);
  }

  ngAfterViewInit(): void {
    const TREE_DEPTH = this.getMaxNumberRounds(this.matches);
    const root: TreeTeamNode | undefined = Tree.createFullBinaryTreeWithMatches(this.matches, TREE_DEPTH);
    const x = (TREE_DEPTH - 1) * 147 + ((TREE_DEPTH - 1) * (this.SPACE_BETWEEN_NODES - this.WIDTH_NODE)) + 30
    this.createTreeHtml(root, TREE_DEPTH, x);
  }

  getMaxNumberRounds(matches: Match[]): number {
    let maxRound = 0;
    matches.forEach(match => {
      if (!match.round) return
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


  createTreeHtml(root: TreeTeamNode | undefined, TREE_DEPTH: number, x: number = 1000, y: number = 350): void {
    if (!root) return;
    // espacio entre nodos horizontal
    let currLevel = 1;
    const queue: { node: TreeTeamNode, isLeft: boolean | null, x: number, y: number, diffY: number, hasSibling: boolean }[] = [
      { node: root, isLeft: null, x, y, diffY: 0, hasSibling: false }
    ];

    while (queue.length > 0) {
      const l = queue.length;

      for (let i = 0; i < l; i++) {
        let { node, isLeft, x, y, diffY,hasSibling } = queue.shift()!;

        if(hasSibling){
          y += 15
          diffY -= 30
        }
        const divTeam1 = this.createTreeNodeHtml(node.teamName1 || " vs ", x, y, true);
        const divTeam2 = this.createTreeNodeHtml(node.teamName2 || " vs ", x, y + this.HEIGHT_NODE, false);

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
        // if(hasSibling){
        //   lineWidth -=
        // }
        const line2 = this.renderer.createElement("div");
        line2.classList.add("line");
        line2.style.top = `${100}%`;
        line2.style.width = `${lineWidth}px`;
        line2.style.right = `${-lineWidth}px`;

        this.renderer.appendChild(this.tree.nativeElement, divTeam1);
        this.renderer.appendChild(this.tree.nativeElement, divTeam2);

        if (isLeft) {
          line2.style.height = `${diffY / 2  }px`;
        } else {
          line2.style.borderTop = 'none'
          line2.style.borderBottom = '1px solid #ccc'
          line2.style.top = `-${diffY / 2 - this.HEIGHT_NODE}px`
          line2.style.height = `${diffY / 2}px`;
        }

        // IF WE ARE NOT IN THE FIRST LEVEL WE ADD THE LINE
        if (currLevel !== 1) {
          this.renderer.appendChild(divTeam1, line2);
        }

        const containerHeight = 900           // total height of the browser
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

  createTreeNodeHtml(teamName: string, x: number, y: number, hasBorders: boolean): HTMLDivElement {
    // remove spaces teamnAMNE
    teamName = teamName.replace(/\s/g, "");
    const div = this.renderer.createElement("div");
    div.classList.add("tree-node-team", `tree-node-team-${teamName}`);

    div.style.top = `${y}px`;
    div.style.left = `${x}px`;
    div.style.width = `${this.WIDTH_NODE}px`;
    div.style.height = `${this.HEIGHT_NODE}px`;
    div.style.fontSize = `12px`;

    if (!hasBorders) {
      div.style.borderTop = "none";
    }
    div.innerHTML = teamName;
    this.renderer.listen(div, 'mouseover', () => this.onHover(teamName, true));  // Mouse enters
    this.renderer.listen(div, 'mouseout', () => this.onHover(teamName, false));  // Mouse leaves
    return div;

  }
}
