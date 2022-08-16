import { ref, watch, readonly } from 'vue';
import { AuraService } from '~/services/AurasServices';
import PlayerAura from '~/models/PlayerAura';
import Aura from '~/models/Aura';
import { useAuraTranslator } from './auraTranslator.hook';
import Tree from '~/models/Tree';
import Ascendancy from '~/models/Ascendancy';
import SupportGem from '~/models/SupportGem';

export function useQuery<T = any>(fetchFunction: () => Promise<any>) {
  const isLoadingRef = ref(true);
  const isLoading = readonly(isLoadingRef);
  const data = ref<T>();

  function fetchData() {
    isLoadingRef.value = true;

    fetchFunction().then((res) => {
      data.value = res;
      isLoadingRef.value = false;
    });
  }
  fetchData();

  return { data, isLoading, refech: fetchData };
}

export function useLoadAuras() {
  const { tAura, tQuality } = useAuraTranslator();
  const auras = ref(new Map<string, PlayerAura>());
  const { data, isLoading } = useQuery(AuraService.getAuras);

  watch(
    isLoading,
    () => {
      if (!isLoading.value) {
        data.value.sort((a: any, b: any) => {
          if (a.active_skill.display_name < b.active_skill.display_name) {
            return -1;
          }
          return 1;
        });

        data.value.forEach((aura: any) => {
          const id: string = aura.active_skill.display_name
            .replaceAll(' ', '')
            .toLowerCase();

          const auraDetail = new Aura(id, tAura(aura), tQuality(aura), aura);
          auras.value.set(id, new PlayerAura(id, auraDetail));
        });

        console.log('Auras Loaded.');
      }
    },
    { immediate: true }
  );

  return { auras, isLoadingAuras: isLoading };
}

export function useLoadSupportGems() {
  const supportGemsStatic = ref(new Map<string, SupportGem>());
  const { data, isLoading } = useQuery<any[]>(AuraService.getSupportGems);

  watch(isLoading, () => {
    if (!isLoading.value) {
      data.value!.forEach((supportGem) => {
        const id: string = supportGem.base_item.display_name
          .replaceAll(' ', '')
          .replace('Support', '')
          .toLowerCase();
        supportGemsStatic.value.set(id, new SupportGem(id, supportGem));
      });

      console.log('Loaded Support Gems.');
    }
  });
  return { supportGemsStatic, isLoadingSupportGems: isLoading };
}

export function useLoadTreeData() {
  const passiveTree = ref(new Tree());
  const ascendancies = ref(new Ascendancy());
  const { data, isLoading } = useQuery(AuraService.getPassiveTreeNodes);

  watch(isLoading, () => {
    if (!isLoading.value) {
      data.value.nodes.forEach((node: any) =>
        passiveTree.value.addNewNode(node)
      );

      data.value.ascNodes.forEach((node: any) =>
        ascendancies.value.addNewNode(node)
      );

      console.log('Passives Loaded.');
    }
  });

  return { passiveTree, ascendancies, isLoadingTreeData: isLoading };
}

export async function getStatTranslations() {
  const translations = ref();
  const bannerTranslations = ref();
  const skillTranslations = ref();

  translations.value = await AuraService.getStatTranslation(
    'stat_translations/banner_aura_skill'
  );
  bannerTranslations.value = await AuraService.getStatTranslation(
    'stat_translations/skill'
  );
  skillTranslations.value = await AuraService.getStatTranslation(
    'stat_translations/aura_skill'
  );

  return {
    translations,
    bannerTranslations,
    skillTranslations,
  };
}
