export default abstract class AbsrtactNode {
  public readonly id: number;
  public readonly name: string;
  public readonly group: number;

  public active: boolean;
  public readonly isNotable: boolean;
  public readonly icon: string;

  constructor(node: any) {
    this.id = node.skill;
    this.group = node.group;
    this.name = node.name;

    this.isNotable = !!node.isNotable;
    this.active = false;
    this.icon = node.icon;
  }

  abstract toggleActive(): void;
}
