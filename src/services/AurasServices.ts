const REPOE: string = 'https://raw.githubusercontent.com/brather1ng/RePoE/master/RePoE/data/';

export default {
  getAuras: async (): Promise<any[]> => {
    const data: any = await fetch(REPOE + 'gems.min.json');
    const json: JSON = await data.json();

    return Object.values(json).filter((value: any) => {
      // Filter out non-aura skills
      if (!value.stat_translation_file.includes('/aura_skill')
        && !value.stat_translation_file.includes('/banner_aura_skill')) return false;
      // Filter out Vaal skills
      if (value.active_skill.display_name.includes('Vaal')) return false;
      // Filter out Royal skills
      if (value.base_item.id.includes('Royal')) return false;
      // Filter out other skills that are classified as auras but are not buffing Auras
      // [Pride] Excluded for now since calculating and running it are both stupid.
      if (value.active_skill.id === 'blinding_aura'
        || value.active_skill.id === 'chaos_degen_aura_unique'
        || value.active_skill.id === 'vaal_aura_elemental_damage_healing'
        || value.active_skill.id === 'blood_sand_armour'
        || value.active_skill.id === 'physical_damage_aura') return false;

      console.log(value);
      return true;
    });
  },

  getStatTranslation: async (filePath: string): Promise<JSON> => {
    const data: any = await fetch(REPOE + filePath + '.min.json');
    const json: JSON = await data.json();
    return json;
  },
};

