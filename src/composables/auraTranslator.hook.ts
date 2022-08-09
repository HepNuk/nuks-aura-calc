import { Ref, inject, unref } from 'vue';

export function useAuraTranslator() {
  const translations = inject<Ref>('translation');
  const bannerTranslations = inject<Ref>('bannerTranslations');
  const skillTranslations = inject<Ref>('skillTranslations');

  if (
    !translations?.value ||
    !bannerTranslations?.value ||
    !skillTranslations?.value
  ) {
    throw new Error("Aura Translations we're not loaded");
  }

  function fixRePoETransaltionErrors(line: string): string {
    const fixedLines = line.replace(
      "Your and nearby Allies'",
      'You and nearby allies'
    );
    // Add more wording error fixes here.
    return fixedLines;
  }

  const getAuraStat = (aura: any): string[] => {
    const stats: string[] = [];

    aura.static.stats.forEach((stat: any) => {
      if (filterOutStats(stat)) {
        let translation: any;

        if (aura.stat_translation_file.includes('/banner_aura_skill')) {
          translation = unref(bannerTranslations).find((tr: any) =>
            tr.ids.includes(stat.id)
          );
        } else if (aura.stat_translation_file.includes('/aura_skill')) {
          translation = unref(translations).find((tr: any) =>
            tr.ids.includes(stat.id)
          );
        } else {
          translation = unref(skillTranslations).find((tr: any) =>
            tr.ids.includes(stat.id)
          );
        }
        if (!translation) {
          stats.push(stat.id);
        } else {
          stats.push(fixRePoETransaltionErrors(translation.English[0].string));
        }
      }
    });

    return stats;
  };

  const getQualityStat = (aura: any): string[][] => {
    const qualityStats: string[][] = [];

    let currentSet = -1;
    aura.static.quality_stats.forEach((stat: any) => {
      if (stat.set > currentSet) {
        currentSet++;
        qualityStats.push([]);
      }

      let translation: any;
      if (aura.stat_translation_file.includes('/banner_aura_skill')) {
        translation = unref(bannerTranslations).find((tr: any) =>
          tr.ids.includes(stat.id)
        );
      } else if (aura.stat_translation_file.includes('/aura_skill')) {
        translation = unref(translations).find((tr: any) =>
          tr.ids.includes(stat.id)
        );
      } else {
        translation = unref(skillTranslations).find((tr: any) =>
          tr.ids.includes(stat.id)
        );
      }
      if (!translation) {
        qualityStats[currentSet].push(stat.id);
      } else {
        qualityStats[currentSet].push(
          fixRePoETransaltionErrors(translation.English[0].string)
        );
      }
    });

    return qualityStats;
  };

  return {
    tAura: getAuraStat,
    tQuality: getQualityStat,
  };
}

export const filterOutStats = (stat: any): boolean => {
  if (stat.id === 'base_deal_no_damage') {
    return false;
  }
  if (stat.id === 'active_skill_base_radius_+') {
    return false;
  }
  if (stat.value !== undefined && stat.value === 0) {
    return false;
  }
  if (isSecondaryValue(stat.id)) {
    return false;
  }

  return true;
};

export const isSecondaryValue = (stat: string): boolean => {
  // Pride is excluded for now, but just in case its worth including later.
  if (
    stat === 'physical_damage_aura_nearby_enemies_physical_damage_taken_+%_max'
  ) {
    return true;
  }
  if (stat.includes('maximum_added_')) {
    return true;
  }

  return false;
};

export const hasSecondaryValue = (stat: string): boolean => {
  // Pride is excluded for now, but just in case its worth including later.
  if (stat === 'physical_damage_aura_nearby_enemies_physical_damage_taken_+%') {
    return true;
  }
  if (stat.includes('minimum_added_')) {
    return true;
  }

  return false;
};
