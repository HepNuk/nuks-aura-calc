const REPOE: string = 'https://raw.githubusercontent.com/brather1ng/RePoE/master/RePoE/data/';
const GEMS: string = 'gems.min.json';
const FILTER: string[] = [
  'blinding_aura',
  'chaos_degen_aura_unique',
  'vaal_aura_elemental_damage_healing',
  'blood_sand_armour',
  'physical_damage_aura', // [Pride] Excluded for now since calculating and running it are both stupid.
];

export default {
  getAuras: async (): Promise<any[]> => {
    const data: any = await fetch(REPOE + GEMS);
    const json: JSON = await data.json();

    return Object.values(json).filter((gem: any) => {
      // Filter out non-aura and non-aura-banner skills
      if (!gem.stat_translation_file.includes('/aura_skill')
        && !gem.stat_translation_file.includes('/banner_aura_skill')) return false;
      // Filter out Vaal skills
      if (gem.active_skill.display_name.includes('Vaal')) return false;
      // Filter out Royal skills
      if (gem.base_item.id.includes('Royal')) return false;
      // Filter out other skills that are classified as auras but are not buffing Auras
      if (FILTER.includes(gem.active_skill.id)) return false;

      return true;
    });
  },

  getSupportGems: async (): Promise<any[]> => {
    const data: any = await fetch(REPOE + GEMS);
    const json: JSON = await data.json();
    return Object.values(json).filter((gem: any) => {
      if (!gem.base_item || !gem.base_item.id) return false;
      // Get only Generosities, Empower and Enhance.
      if (gem.base_item.id.includes('SupportGemGenerosity')) return true;

      // Empower and Enhanced not needed for now since we input Quality and Level manually
      // if (gem.base_item.id.includes('SupportGemAdditionalQuality')) return true;
      // if (gem.base_item.id.includes('SupportGemAdditionalLevel')) return true;

      return false;
    });
  },

  getStatTranslation: async (filePath: string): Promise<JSON> => {
    const data: any = await fetch(REPOE + filePath + '.min.json');
    const json: JSON = await data.json();
    return json;
  },
};
