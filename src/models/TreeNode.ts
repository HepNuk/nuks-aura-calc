import AbstractNode from './AbstractNode';

export default class TreeNode extends AbstractNode {

  public readonly value: number;

  constructor(node: any) {
    super(node);
    this.value = this.getValueFromJSONNode(node.stats);
  }

  public toggleActive() { this.active = !this.active; }

  public getValueFromJSONNode(stats: string[]): number {
    let value = 0;
    stats.some((stat) => {

      if (stat.match(/(\d*)% increased effect of Non-Curse Auras from your Skills/)) {
        value = parseInt(stat.match(/(\d*)% increased effect of Non-Curse Auras from your Skills/)[1], 10);
      }
    });

    return value;
  }
}