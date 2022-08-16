import { Ref, ref, inject, computed, provide } from 'vue';
import Ascendancy from '~/models/Ascendancy';
import type PlayerAura from '~/models/PlayerAura';
import type SupportGem from '~/models/SupportGem';
import Tree from '~/models/Tree';

export function useAuras() {
  const { auras, updateAura } = inject<{
    auras: Ref<Map<string, PlayerAura>>;
    updateAura: (id: string, newValue: PlayerAura) => void;
  }>('auras')!;

  return { auras, updateAura };
}

export function useSupportGems() {
  const { supportGemsStatic } = inject<{
    supportGemsStatic: Ref<Map<string, SupportGem>>;
  }>('supportGemsStatic')!;
  return { supportGemsStatic };
}

export function usePassiveTree() {
  const { passiveTree } = inject<{
    passiveTree: Ref<Tree>;
  }>('passiveTree')!;

  return { passiveTree };
}

export function useAscendancies() {
  const { ascendancies } = inject<{
    ascendancies: Ref<Ascendancy>;
  }>('ascendancies')!;
  return { ascendancies };
}

export function useAura(id: string) {
  const { auras } = useAuras();

  // const aura = computed({
  //   get: () => auras.value.get(id)!,
  //   set: (v: PlayerAura) => updateAura(id, v),
  // });

  const aura = auras.value.get(id);
  return { aura };
}

export function useSupportGem(id: string) {
  const { supportGemsStatic } = useSupportGems();

  const supportGem = supportGemsStatic.value.get(id);
  return { supportGem };
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
