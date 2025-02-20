import { Match } from "./single-elimination-tree/test";

export class TreeTeamNode {
  public winner: "left" | "right" | null = null;
  constructor(public match?: Match, public left?: TreeTeamNode, public right?: TreeTeamNode, public idParent?: string, public id?: string) {
    this.match = match
    this.left = left;
    this.right = right;
    this.idParent = idParent
    this.id = id;
  }
}

