export default class Translator {
  private translations: any;

  constructor(translations: any) {
    this.translations = translations;
  }

  public getAuraStat = (aura: any): string[] => {
    const stats: string[] = [];

    aura.static.stats.forEach((stat: any) => {
      if (filterOutStats(stat.id)) {
        const translation = this.translations.find((tr: any) => tr.ids.includes(stat.id));
        stats.push(translation.English[0].string);
      }
    });

    return stats;
  }

  public getQualityStat = (aura: any): string[] => {
    const qualityStats: string[] = [];

    aura.static.quality_stats.forEach((stat: any) => {
      const translation = this.translations.find((tr: any) => tr.ids.includes(stat.id));

      qualityStats.push(translation.English[0].string);
    });

    return qualityStats;
  }
}

export const filterOutStats = (stat: string): boolean => {
  if (stat === 'base_deal_no_damage') return false;
  if (stat === 'active_skill_base_radius_+') return false;
  if (isSecondaryValue(stat)) return false;

  return true;
};

export const isSecondaryValue = (stat: string): boolean => {
  // Pride is excluded for now, but just in case its worth including later.
  if (stat === 'physical_damage_aura_nearby_enemies_physical_damage_taken_+%_max') return true;
  if (stat.includes('maximum_added_')) return true;

  return false;
};

export const hasSecondaryValue = (stat: string): boolean => {
  // Pride is excluded for now, but just in case its worth including later.
  if (stat === 'physical_damage_aura_nearby_enemies_physical_damage_taken_+%') return true;
  if (stat.includes('minimum_added_')) return true;

  return false;
};
