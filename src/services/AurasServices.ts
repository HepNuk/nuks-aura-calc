import {
  PASSIVE_TREE_LINK,
  REPOE_LINK,
  REPOE_GEMS,
  GEM_FILTER_OUT,
  AURA_NODE_IDS,
  ASCENDANCY_NODE_IDS,
  GET_GEMS_IDS,
} from '@/assets/constantes';

export default {
  getAuras: async (): Promise<any[]> => {
    const data: any = await fetch(REPOE_LINK + REPOE_GEMS);
    const json: JSON = await data.json();

    return Object.values(json).filter((gem: any) => {
      // Bypass filter for these Gems
      if (gem.base_item
        && GET_GEMS_IDS.includes(gem.base_item.id)) return true;
      // Filter out non-aura and non-aura-banner skills
      if (!gem.stat_translation_file.includes('/aura_skill')
        && !gem.stat_translation_file.includes('/banner_aura_skill')) return false;
      // Filter out Vaal skills
      if (gem.active_skill.display_name.includes('Vaal')) return false;
      // Filter out Royal skills
      if (gem.base_item.id.includes('Royal')) return false;
      // Filter out other skills that are classified as auras but are not buffing Auras
      if (GEM_FILTER_OUT.includes(gem.active_skill.id)) return false;

      return true;
    });
  },

  getSupportGems: async (): Promise<any[]> => {
    const data: any = await fetch(REPOE_LINK + REPOE_GEMS);
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
    const data: any = await fetch(REPOE_LINK + filePath + '.min.json');
    const json: JSON = await data.json();
    return json;
  },

  getPassiveTreeNodes: async (): Promise<any> => {
    const data: any = await fetch(PASSIVE_TREE_LINK);
    const json: any = await data.json();
    const nodes: any[] = [];
    const ascNodes: any[] = []

    Object.entries(json.nodes).filter(([key, value]) => {
      if (AURA_NODE_IDS.includes(key)) nodes.push(value);
      if (ASCENDANCY_NODE_IDS.includes(key)) ascNodes.push(value);
    });


    return { nodes, ascNodes };
  }
};
