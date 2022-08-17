<template>
  <div class="aura-app">
    <MainHeader class="mb-2" title="Nuk's PoE Aura stats calculator" version="3.16" />
    <MySpinner v-if="loading" />

    <div v-else-if="!loading" class="d-flex">
      <div class="flex-grow-1 me-2">
        <AuraSection class="content-box" />
        <TreeSection class="content-box" />
        <AscendancySection class="content-box" />
      </div>

      <div class="justify-content-center">
        <OutputSection class="output-stats sticky" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, provide, ref } from 'vue';
import OutputSection from './components/outputSection/OutputSection.vue';
import MainHeader from './components/shared/MainHeader.vue';
import {
  useLoadAuras,
  useLoadSupportGems,
  useLoadTreeData,
} from './composables/useLoadAuras.hooks';
import AuraSection from './components/auraSection/AuraSection.vue';
import TreeSection from './components/treeSection/TreeSection.vue';
import AscendancySection from './components/ascendancySection/AscendancySection.vue';

export default defineComponent({
  name: 'App',
  components: {
    AscendancySection,
    AuraSection,
    OutputSection,
    MainHeader,
    TreeSection,
  },

  setup() {
    const { auras, isLoadingAuras } = useLoadAuras();
    const { supportGemsStatic, isLoadingSupportGems } = useLoadSupportGems();
    const { passiveTree, ascendancies, isLoadingTreeData } = useLoadTreeData();
    const reservedValues = ref({ life: 0, mana: 0 });

    const updateReservedLife = (life: number) => {
      reservedValues.value.life = life;
    };
    const updateReservedMana = (mana: number) => {
      reservedValues.value.mana = mana;
    };

    const globalAuraEffect = computed(
      () => passiveTree.value.getAuraEffect() + ascendancies.value.getAuraEffect()
    );

    provide('auras', { auras });
    provide('supportGemsStatic', { supportGemsStatic });
    provide('passiveTree', { passiveTree });
    provide('ascendancies', { ascendancies });
    provide('globalAuraEffect', { globalAuraEffect });
    provide('reservedValues', { reservedValues, updateReservedLife, updateReservedMana });

    const loading = computed(
      () => isLoadingAuras.value && isLoadingSupportGems.value && isLoadingTreeData.value
    );
    return {
      auras,
      ascendancies,
      passiveTree,
      supportGemsStatic,
      reservedValues: 0,
      globalAuraEffect,
      loading,
      isLoadingAuras,
      isLoadingSupportGems,
      isLoadingTreeData,
    };
  },
});
</script>

<style lang="scss">
@import '~/assets/css/styles.scss';
.sticky {
  top: 0.5em;
  position: sticky;
}
</style>
