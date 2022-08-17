import { Ref, ref, inject, computed, ComputedRef } from 'vue';
import Ascendancy from '~/models/Ascendancy';
import type PlayerAura from '~/models/PlayerAura';
import type SupportGem from '~/models/SupportGem';
import Tree from '~/models/Tree';
import { imageUrl } from './common.hook';

export function useAuraIcons(id: string) {
  const auraIcon = ref(imageUrl(`img/auras/${id}.png`));
  const gemIcon = ref(imageUrl(`img/gems/${id}.png`));

  return {
    auraIcon,
    gemIcon,
  };
}

export function useReserverstions() {
  const { reservedValues, updateReservedLife, updateReservedMana } = inject<{
    reservedValues: Ref<{ life: number; mana: number }>;
    updateReservedLife: (life: number) => void;
    updateReservedMana: (mana: number) => void;
  }>('reservedValues')!;

  const reservedLife = computed({
    get: () => reservedValues.value.life,
    set: (life: number) => updateReservedLife(life),
  });

  const reservedMana = computed({
    get: () => reservedValues.value.mana,
    set: (mana: number) => updateReservedMana(mana),
  });

  return {
    reservedValues,
    reservedLife,
    reservedMana,
  };
}

export function useAuras() {
  const { auras } = inject<{
    auras: Ref<Map<string, PlayerAura>>;
  }>('auras')!;

  return {
    auras,
  };
}

export function useSupportGems() {
  const { supportGemsStatic } = inject<{
    supportGemsStatic: Ref<Map<string, SupportGem>>;
  }>('supportGemsStatic')!;
  return {
    supportGemsStatic,
  };
}

export function usePassiveTree() {
  const { passiveTree } = inject<{
    passiveTree: Ref<Tree>;
  }>('passiveTree')!;

  return {
    passiveTree,
  };
}

export function useGlobalAuraEffect() {
  const { globalAuraEffect } = inject<{
    globalAuraEffect: ComputedRef<number>;
  }>('globalAuraEffect')!;

  return {
    globalAuraEffect,
  };
}

export function useAura(id: string) {
  const { auras } = useAuras();
  const aura = computed({
    get: () => auras.value.get(id)!,
    set: (v) => auras.value.set(id, v),
  });
  return {
    aura,
  };
}

export function useSupportGem(id: string) {
  const { supportGemsStatic } = useSupportGems();
  const supportGem = supportGemsStatic.value.get(id);
  return { supportGem };
}

export function usePassiveTreeClusters() {
  const { passiveTree } = usePassiveTree();
  const treeClusters = passiveTree.value.treeClusters!;
  return { treeClusters };
}

export function useCluster(id: number) {
  const { treeClusters } = usePassiveTreeClusters();
  const cluster = treeClusters.get(id)!;
  function toggleNotable(newValue?: boolean) {
    cluster.notable.active = newValue || !cluster.notable.active;
  }

  function toggleSmallNode(idx: number, newValue?: boolean) {
    cluster.smallNodes[idx].active = newValue || !cluster.smallNodes[idx].active;
  }

  return {
    cluster,
    toggleSmallNode,
    toggleNotable,
  };
}

export function useJewelSockets() {
  const { passiveTree } = usePassiveTree();

  const potency = computed({
    get: () => passiveTree.value.potency,
    set: (v) => (passiveTree.value.potency = v),
  });

  const clusterJewels = computed({
    get: () => passiveTree.value.clusterJewels,
    set: (v) => (passiveTree.value.clusterJewels = v),
  });

  const timelessJewel = computed({
    get: () => passiveTree.value.timelessJewel,
    set: (v) => (passiveTree.value.timelessJewel = v),
  });

  return {
    potency,
    clusterJewels,
    timelessJewel,
  };
}

export function useAscendancies() {
  const { ascendancies } = inject<{
    ascendancies: Ref<Ascendancy>;
  }>('ascendancies')!;
  return {
    ascendancies,
  };
}

export function useAscendancyTree() {
  const { ascendancies } = useAscendancies();
  const ascendancyTrees = ascendancies.value.ascendancyTrees;
  function selectAscendancy(asc: string) {
    ascendancies.value.selectAscendancy(asc);
  }

  return { ascendancyTrees, selectAscendancy };
}

export function useAscendancy(ascendancyId: string) {
  const { ascendancies } = useAscendancies();
  const ascendancy = ascendancies.value.ascendancyTrees.get(ascendancyId)!;
  function toggleNode(index: number, newValue: boolean) {
    ascendancies.value.ascendancyTrees.get(ascendancyId)![index].active = newValue;
  }

  return { ascendancy, toggleNode };
}

export function useCurrentAscendancy() {
  const { ascendancies } = useAscendancies();
  const currentAscendancy = computed(() => ascendancies.value.ascendancy);
  return { currentAscendancy };
}
