export default class TreeNode {

  public readonly id: number;
  public readonly name: string;
  public readonly group: number;
  public readonly value: number;

  public active: boolean;
  public readonly isNotable: boolean;
  public readonly icon: string;

  constructor(node: any) {
    this.id = node.skill.toString();
    this.name = node.name;
    this.group = node.group;
    this.value = this.getValueFromJSONNode(node.stats);
    this.isNotable = !!node.isNotable;
    this.active = true;
    this.icon = node.icon;
  }

  public toggleActive() { this.active = !this.active; }

  private getValueFromJSONNode(stats: string[]): number {
    let value = 0;
    stats.some((stat) => {
      const index = stat.indexOf('% increased effect of Non-Curse Auras from your Skills');
      if (index !== -1) {
        value = parseInt(stat.slice(0, index), 10);
        return true;
      }
    });

    return value;
  }
}