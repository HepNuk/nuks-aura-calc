import TreeCluster from './TreeCluster';
import AscNode from './AscNode';

export default class Ascendancy {

  public ascendancy: string;
  public ascendancyTrees: Map<string, TreeCluster>;

  constructor() {
    this.ascendancyTrees = new Map<string, TreeCluster>();
    this.ascendancy = null;
  }

  public addNewNode(ascNodes: any) {
    const treeNode = new AscNode(ascNodes);
  }
}
