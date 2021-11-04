import StatPerLevel from './StatPerLevel';
import { filterOutStats, hasSecondaryValue } from '@/plugins/AuraTranslator';

export default class Aura {
  public id: string;
  public displayName: string;
  public stats: string[];
  public statsPerLevel: number[][];

  constructor(aura: any, stats: string[]) {
    this.id = aura.active_skill.id;
    this.displayName = aura.active_skill.display_name;
    this.stats = stats;
    this.statsPerLevel = this.makeStatsPerLevel(aura);
  }

  private makeStatsPerLevel = (aura: any): number[][] => {
    const statsPerLevel: any[any] = [];

    let i = 0;
    aura.static.stats.forEach((stat: any) => {
      if (stat.value && stat.value !== 0) {
        statsPerLevel.push({value: stat.value}) ;
        i++;
      } else if (filterOutStats(stat.id)) {
        statsPerLevel.push([]);
        if (hasSecondaryValue(stat.id)) {
          Object.entries(aura.per_level).forEach((value: any, key: any): any => {
            statsPerLevel[i].push([
              value[1].stats[i],
              value[1].stats[i + 1],
            ]);
          });
          // i++;
        } else {
          Object.entries(aura.per_level).forEach((value: any, key: any): any => {
            statsPerLevel[i].push([value[1].stats[i]]);
          });
        }
        i++;
      }
    });

    return statsPerLevel;
  }
}
