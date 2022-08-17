import { Ref, ref, inject, computed, provide, ComputedRef } from 'vue';
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

export function useAscendancies() {
  const { ascendancies } = inject<{
    ascendancies: Ref<Ascendancy>;
  }>('ascendancies')!;
  return {
    ascendancies,
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

  if (!auras.value.get(id)) {
    throw new Error(`Cannot find aura with id : ${id}`);
  } else {
    return {
      aura: auras.value.get(id)!,
    };
  }
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

export function usePassiveNode(id: string) {
  const { passiveTree } = usePassiveTree();

  // const passiveNode = passiveTree.value.
}

export function usePassiveNotable(id: string) {
  const { passiveTree } = usePassiveTree();

  // const passiveNode = passiveTree.value.get;
}

export function usePassiveNode2(id: string) {
  const { passiveTree } = usePassiveTree();

  // const passiveNode = passiveTree.value
}

export function useAscendancyNode(id: string) {
  const { ascendancies } = inject<{
    ascendancies: Ref<Ascendancy>;
  }>('ascendancies')!;

  // const ascendancyNode = ascendancies
}
