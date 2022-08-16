import {
  filterOutStats,
  hasSecondaryValue,
} from '~/composables/auraTranslator.hook';

export default class Aura {
  public id: string;
  public displayName: string;
  public stats: string[];
  public qualityStats: string[][];
  public statsPerQuality: any[];
  public statsPerLevel: any[];
  public isBanner: boolean;

  constructor(
    id: string,
    stats: string[],
    qualityStats: string[][],
    aura: any
  ) {
    this.id = id;
    this.displayName = aura.active_skill.display_name;
    this.stats = stats;
    this.qualityStats = qualityStats;
    this.statsPerLevel = this.makeStatsPerLevel(aura);
    this.statsPerQuality = this.makeStatsPerQuality(aura);
    this.isBanner = aura.stat_translation_file.includes('/banner_aura_skill');
  }

  private makeStatsPerLevel(aura: any): any[] {
    const statsPerLevel: any[any] = [];

    let i = 0;
    let j = 0;
    aura.static.stats.forEach((stat: any) => {
      if (stat.value && stat.value !== 0) {
        statsPerLevel.push({ value: stat.value });
        j++;
      } else if (filterOutStats(stat)) {
        statsPerLevel.push([]);
        if (hasSecondaryValue(stat.id)) {
          Object.entries(aura.per_level).forEach(
            (value: any, key: any): any => {
              statsPerLevel[j].push([value[1].stats[i], value[1].stats[i + 1]]);
            }
          );
        } else {
          Object.entries(aura.per_level).forEach(
            (value: any, key: any): any => {
              statsPerLevel[j].push([value[1].stats[i]]);
            }
          );
        }
        j++;
      }
      i++;
    });

    return statsPerLevel;
  }

  private makeStatsPerQuality(aura: any) {
    const statsPerQuality: number[][] = [];

    let currentSet = -1;
    aura.static.quality_stats.forEach((stat: any) => {
      if (stat.set > currentSet) {
        currentSet++;
        statsPerQuality.push([]);
      }

      statsPerQuality[currentSet].push(stat.value);
    });

    return statsPerQuality;
  }
}
