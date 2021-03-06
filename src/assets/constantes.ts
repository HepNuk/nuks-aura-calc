export const PASSIVE_TREE_LINK: string = 'https://raw.githubusercontent.com/grindinggear/skilltree-export/master/data.json';
export const REPOE_LINK: string = 'https://raw.githubusercontent.com/brather1ng/RePoE/master/RePoE/data/';
export const REPOE_GEMS: string = 'gems.min.json';

export const GET_GEMS_IDS = [
  'Metadata/Items/Gems/SkillGemSmite'
];

export const GEM_FILTER_OUT: string[] = [
  'blinding_aura',
  'chaos_degen_aura_unique',
  'vaal_aura_elemental_damage_healing',
  'blood_sand_armour',
  'physical_damage_aura', // [Pride] Excluded for now since calculating and running it are both stupid.
];

export const AURA_NODE_IDS = [
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
];

export const ASCENDANCY_NODE_IDS = [
            // Gurdian
  '64768',  // Unwavering Faith
  '19641',  // Unwavering Crusade
  '42264',  // Radiant Faith
  '37419',  // Armour and Energy Shield, Aura Effect
  '20050',  // Armour and Energy Shield, Aura Effect

            // Ascendant
  '30919',  // Gurdian Ascendancy
  '10099',  // Necromancer Ascendancy
  '39598',  // Champion Ascendancy

            // Necromancer
  '36017',  // Commander of Darkness
  '11490',  // Plaguebringer
  '5415',   // Minion Damage, Aura Effect

            // Champion
  '56967',  // Worthy Foe
  '11412',  // Inspirational
  '25111',  // Armour and Evasion, Aura Effect
];

export const ASCENDANCIES = [
  'Gurdian',
  'Ascendant',
  'Necromancer',
  'Champion',
];

