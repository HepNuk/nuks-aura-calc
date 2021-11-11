import TreeCluster from './TreeCluster';
import TreeNode from './TreeNode';

export default class Tree {

  public treeClusters: Map<number, TreeCluster>;
  public timelessJewel: number = 0;
  public clusterJewels: number = 0;
  public potency: boolean = false;

  constructor() {
    this.treeClusters = new Map<number, TreeCluster>();
  }

  public addNewNode(node: any) {
    const treeNode = new TreeNode(node);

    if (this.treeClusters.has(treeNode.group)) {
      if (treeNode.isNotable) this.treeClusters.get(treeNode.group)!.setNotable(treeNode);
      else this.treeClusters.get(treeNode.group)!.addSmallNode(treeNode);
    } else {
      const treeCluster = new TreeCluster(treeNode);
      this.treeClusters.set(treeNode.group, treeCluster);
    }
  }

  public getNotables(): TreeNode[] {
    const notables: TreeNode[] = [];

    this.treeClusters.forEach((treeCluster) => {
      if (treeCluster.notable) notables.push(treeCluster.notable);
    });

    return notables;
  }

  public getNotableById(id: number): TreeNode {
    this.treeClusters.forEach((treeCluster) => {
      if (treeCluster.notable && treeCluster.notable.id === id) {
        return treeCluster.notable;
      }
    });

    return null;
  }

  public getNotableByGroupId(id: number): TreeNode {
    if (this.treeClusters.has(id)) {
      return this.treeClusters.get(id)!.notable;
    }

    return null;
  }

  public getSmallNodesForGroup(id: number): TreeNode[] {
    if (this.treeClusters.has(id)) {
      return this.treeClusters.get(id)!.smallNodes;
    }

    return [];
  }

  public reset(): void {
    this.forEachNode((node) => {
      node.active = false;
    });
  }

  public getAuraEffect(): number {
    let ae = 0;

    this.forEachNode((node) => {
      if (node.active) ae += node.value;
    });

    console.log(this.timelessJewel)
    ae += this.timelessJewel;
    ae += this.clusterJewels;
    if (this.potency) ae += 3; // FIXME: Make Constant or fetch data.

    return ae;
  }

  public forEachNode(callback: (node: TreeNode) => void) {
    this.treeClusters.forEach((treeCluster) => {
      if (treeCluster.notable) callback(treeCluster.notable);

      treeCluster.smallNodes.forEach((smallNode) => {
        callback(smallNode);
      });
    });
  }
}
