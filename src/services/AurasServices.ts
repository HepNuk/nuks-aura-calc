const REPOE: string = 'https://raw.githubusercontent.com/brather1ng/RePoE/master/RePoE/data/';

export default {
  getAuras: async (): Promise<any[]> => {
    const data: any = await fetch(REPOE + 'gems.min.json');
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
      // [Pride] Excluded for now since calculating and running it are both stupid.
      if (gem.active_skill.id === 'blinding_aura'
        || gem.active_skill.id === 'chaos_degen_aura_unique'
        || gem.active_skill.id === 'vaal_aura_elemental_damage_healing'
        || gem.active_skill.id === 'blood_sand_armour'
        || gem.active_skill.id === 'physical_damage_aura') return false;

      return true;
    });
  },

  getSupportGems: async (): Promise<any[]> => {
    const data: any = await fetch(REPOE + 'gems.min.json');
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
