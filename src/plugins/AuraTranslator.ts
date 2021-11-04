export default class Translator {
  private translations: any;

  constructor(translations: any) {
    this.translations = translations;
  }

  public getAuraStat = (aura: any): string[] => {
    const stats: string[] = [];

    aura.static.stats.forEach((e: any) => {
      if (filterOutStats(e.id)) {
        const translation = this.translations.find((tr: any) => tr.ids.includes(e.id));
        stats.push(translation.English[0].string);
      }
    });

    return stats;
  }
}

export const filterOutStats = (stat: string): boolean => {
  if (stat === 'base_deal_no_damage') return false;
  if (stat === 'active_skill_base_radius_+') return false;
  if (isSecondaryValue(stat)) return false;

  return true;
};

export const isSecondaryValue = (stat: string): boolean => {
  if (stat === 'physical_damage_aura_nearby_enemies_physical_damage_taken_+%_max') return true;
  if (stat.includes('maximum_added_')) return true;

  return false;
};

export const hasSecondaryValue = (stat: string): boolean => {
  if (stat === 'physical_damage_aura_nearby_enemies_physical_damage_taken_+%') return true;
  if (stat.includes('minimum_added_')) return true;

  return false;
};
