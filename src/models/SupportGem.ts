export default class SupportGem {
  public id: string;
  public displayName: string;
  public statsPerLevel: number[];

  constructor(id: string, supportGem: any) {
    this.displayName = supportGem.base_item.display_name.replaceAll(' Support', '');
    this.statsPerLevel = this.makeStatsPerLevel(supportGem);
  }

  private makeStatsPerLevel = (supportGem: any): number[] => {
    const statsPerLevel: any[any] = [];

    Object.values(supportGem.per_level).forEach((stat: any) => {
      statsPerLevel.push(stat.stats[0].value);
    });

    return statsPerLevel;
  }
}
