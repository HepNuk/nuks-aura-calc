import TreeNode from './TreeNode';

export default class TreeCluster {
  public readonly group: number;

  public notable: TreeNode;
  public smallNodes: TreeNode[];

  constructor(treeNode: TreeNode) {
    this.smallNodes = [];

    if (treeNode.isNotable) {
      this.notable = treeNode;
    } else {
      this.smallNodes.push(treeNode);
    }
  }

  public setNotable(treeNode: TreeNode) {
    this.notable = treeNode;
  }

  public addSmallNode(treeNode: TreeNode) {
    this.smallNodes.push(treeNode);
  }
}
