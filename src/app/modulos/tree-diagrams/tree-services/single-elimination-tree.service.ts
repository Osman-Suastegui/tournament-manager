import { Injectable } from "@angular/core";
import { TreeTeamNode } from "../tree.model";
import { createEmptyMatch, Match } from "../single-elimination-tree/test";

@Injectable({
  providedIn: "root"
})
export class SingleEliminationTreeService {

  constructor() { }

  private createBinaryTree(depth: number, prev: string | null, matches: Match[]): TreeTeamNode | undefined {
    if (depth <= 0 || !prev) return undefined;

    // Find the match at the current level
    const match = matches.find(m => m.id === prev);
    if (!match) return undefined;

    // Find previous matches that lead to this one
    const matchesLevel = matches.filter(m => m.next === match.id);
    matchesLevel.sort((a, b) => parseInt(a.id) - parseInt(b.id));

    // Left and right children (from previous round)
    const leftChild = matchesLevel.length > 0 ? this.createBinaryTree(depth - 1, matchesLevel[0].id, matches) : undefined;
    const rightChild = matchesLevel.length > 1 ? this.createBinaryTree(depth - 1, matchesLevel[1].id, matches) : undefined;
    const newNode: TreeTeamNode = new TreeTeamNode();
    newNode.match = createEmptyMatch();
    newNode.match.id = match.id;
    newNode.match.next = match.next;
    newNode.match.winner = match.winner;

    if (leftChild != undefined) {
      if (leftChild.match?.team1.id == match.team1?.id) {
        newNode.match.team1 = match.team1;
      }
      if (leftChild.match?.team1.id == match.team2?.id) {
        newNode.match.team1 = match.team2;
      }
      if (leftChild.match?.team2.id == match.team2?.id) {
        newNode.match.team1 = match.team2;
      }
      if (leftChild.match?.team2.id == match.team1?.id) {
        newNode.match.team1 = match.team1;
      }
    } else {
      newNode.match.team1 = match.team1;

    }
    if (rightChild != undefined) {

      if (rightChild.match?.team1.id == match.team1?.id) {
        newNode.match.team2 = match.team1;
      }
      if (rightChild.match?.team1.id == match.team2?.id) {
        newNode.match.team2 = match.team2;
      }
      if (rightChild.match?.team2.id == match.team2?.id) {
        newNode.match.team2 = match.team2;
      }

      if (rightChild.match?.team2.id == match.team1?.id) {
        newNode.match.team2 = match.team1;
      }
    } else {
      newNode.match.team2 = match.team2;
    }
    if (!leftChild && !rightChild) {
      return new TreeTeamNode(match, leftChild, rightChild);

    }
    newNode.left = leftChild;
    newNode.right = rightChild;
    return newNode;
  }

  createBinaryTreeWithMatches(matches: Match[], depth: number): TreeTeamNode | undefined {
    const rootMatch = matches.find(m => m.round === 1); // Find the final match
    if (rootMatch) {
      const tree = this.createBinaryTree(depth, rootMatch.id, matches);
      return tree;
    }
    return undefined;

  }

}
