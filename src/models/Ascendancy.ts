import AscNode from './AscNode';

export default class Ascendancy {

  public ascendancy: string;
  public ascendancyTrees: Map<string, AscNode[]>;

  constructor() {
    this.ascendancyTrees = new Map<string, AscNode[]>();
    this.ascendancy = null;
  }

  public addNewNode(ascNodes: any) {
    const ascendancy: string = ascNodes.ascendancyName.toLowerCase();
    const treeNode = new AscNode(ascNodes);

    if (this.ascendancyTrees.has(ascendancy)) {
      this.ascendancyTrees.get(ascendancy).push(treeNode);
    } else {
      this.ascendancyTrees.set(ascendancy, [treeNode]);
    }
  }

  public getAuraEffect(): number {
    let ae = 0;
    this.forEachNode((ascNode) => {
      if (ascNode.active) {
        ascNode.isAuraEffect.forEach((e, i) => {
          if (e) ae += ascNode.values[i];
        });
      }
    });

    return ae;
  }

  public forEachNode(callback: (node: AscNode) => void) {
    if (!this.ascendancy) return;

    const ascNodes = this.ascendancyTrees.get(this.ascendancy);
    ascNodes.forEach((ascNode) => {
      callback(ascNode);
    });
  }
}
