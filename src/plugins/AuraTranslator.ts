export default class Translator {
  private translations: any;
  private bannerTranslations: any;
  private skillTranslations: any;

  constructor(translations: any, bannerTranslations: any, skillTranslations: any) {
    this.translations = translations;
    this.bannerTranslations = bannerTranslations;
    this.skillTranslations = skillTranslations;
  }

  public getAuraStat = (aura: any): string[] => {
    const stats: string[] = [];

    aura.static.stats.forEach((stat: any) => {
      if (filterOutStats(stat)) {
        let translation: any;

        if (aura.stat_translation_file.includes('/banner_aura_skill')) {
          translation = this.bannerTranslations.find((tr: any) => tr.ids.includes(stat.id));
        } else if (aura.stat_translation_file.includes('/aura_skill')) {
          translation = this.translations.find((tr: any) => tr.ids.includes(stat.id));
        } else {
          translation = this.skillTranslations.find((tr: any) => tr.ids.includes(stat.id));
        }
        if (!translation) stats.push(stat.id);
        else stats.push(this.fixRePoETransaltionErrors(translation.English[0].string));
      }
    });

    return stats;
  }

  public getQualityStat = (aura: any): string[][] => {
    const qualityStats: string[][] = [];

    let currentSet: number = -1;
    aura.static.quality_stats.forEach((stat: any) => {
      if (stat.set > currentSet) {
        currentSet++;
        qualityStats.push([]);
      }

      let translation: any;
      if (aura.stat_translation_file.includes('/banner_aura_skill')) {
        translation = this.bannerTranslations.find((tr: any) => tr.ids.includes(stat.id));
      } else if (aura.stat_translation_file.includes('/aura_skill')) {
        translation = this.translations.find((tr: any) => tr.ids.includes(stat.id));
      } else {
        translation = this.skillTranslations.find((tr: any) => tr.ids.includes(stat.id));
      }
      if (!translation) qualityStats[currentSet].push(stat.id);
      else qualityStats[currentSet].push(this.fixRePoETransaltionErrors(translation.English[0].string));
    });

    return qualityStats;
  }

  private fixRePoETransaltionErrors(line: string): string {
    let fixedLines = line.replace('Your and nearby Allies\'', 'You and nearby allies');
    // Add more wording error fixes here.
    return fixedLines;
  }
}

export const filterOutStats = (stat: any): boolean => {
  if (stat.id === 'base_deal_no_damage') return false;
  if (stat.id === 'active_skill_base_radius_+') return false;
  if (stat.value !== undefined && stat.value === 0) return false;
  if (isSecondaryValue(stat.id)) return false;

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
