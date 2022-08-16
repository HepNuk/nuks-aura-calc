import { Ref, ref, inject, computed } from 'vue';
import PlayerAura from '~/models/PlayerAura';

export function useAura(id: string) {
  const { auras, updateAura } = inject<{
    auras: Ref<Map<string, PlayerAura>>;
    updateAura: (id: string, newValue: PlayerAura) => void;
  }>('auras')!;

  const aura = computed({
    get: () => auras.value.get(id)!,
    set: (v: PlayerAura) => updateAura(id, v),
  });

  return auras;
}
