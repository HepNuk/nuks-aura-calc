const PASSIVE_TREE: string = 'https://raw.githubusercontent.com/grindinggear/skilltree-export/master/data.json';
const REPOE: string = 'https://raw.githubusercontent.com/brather1ng/RePoE/master/RePoE/data/';
const GEMS: string = 'gems.min.json';

const FILTER: string[] = [
  'blinding_aura',
  'chaos_degen_aura_unique',
  'vaal_aura_elemental_damage_healing',
  'blood_sand_armour',
  'physical_damage_aura', // [Pride] Excluded for now since calculating and running it are both stupid.
];

const AURA_NODE_IDS = [
  '32932',  // Sovereignty
  '9392',   // Aura Effect Small

  '12143',  // Influence
  '55571',  // Aura Effect Small

  '65097',  // Leaderhip
  '57736',  // Aura Effect Small

  '6799',   // Charisma

  '33718',  // Chamption of the Cause
  '34513',  // Aura Effect Small

  '36949',  // Devotion

  '6265',
]

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

  getPassiveTree: async (): Promise<any> => {
    const data: any = await fetch(PASSIVE_TREE);
    const json: JSON = await data.json();

    console.log(json);
  }
};
