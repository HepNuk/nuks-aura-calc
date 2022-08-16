<template>
  <div class="aura-app">
    <MainHeader title="Nuk's PoE Aura stats calculator" version="3.16" />
    <MySpinner v-if="loading" />

    <div v-else>Loaded</div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, provide } from 'vue';
import MainHeader from './components/shared/MainHeader.vue';
import {
  useLoadAuras,
  useLoadSupportGems,
  useLoadTreeData,
} from './composables/useLoadAuras.hooks';
import Aura from './models/Aura';

export default defineComponent({
  name: 'App',
  components: { MainHeader },

  setup() {
    const { auras, isLoadingAuras } = useLoadAuras();
    const { supportGemsStatic, isLoadingSupportGems } = useLoadSupportGems();
    const { passiveTree, ascendancies, isLoadingTreeData } = useLoadTreeData();

    function updateAura(id: string, newValues: Aura) {}
    function updatePassive() {}
    function updateAscendancy() {}

    const globalAuraEffect = computed(
      () => passiveTree.value.getAuraEffect() + ascendancies.value.getAuraEffect()
    );

    provide('auras', { auras, updateAura });
    provide('supportGemsStatic', { supportGemsStatic });
    provide('passiveTree', { passiveTree, updatePassive });
    provide('ascendancies', { ascendancies, updateAscendancy });
    provide('globalAuraEffect', globalAuraEffect);

    const loading = computed(
      () => isLoadingAuras.value && isLoadingSupportGems.value && isLoadingTreeData.value
    );
    return { loading, isLoadingAuras, isLoadingSupportGems, isLoadingTreeData };
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
