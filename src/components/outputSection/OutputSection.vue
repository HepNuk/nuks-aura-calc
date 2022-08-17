<template>
  <div class="output-section">
    <div class="sticky">
      <h1 class="mb-0">Aura Stats</h1>
      <p>{{ globalAuraEffect }}% Global Aura Effect</p>
    </div>

    <AuraStat v-for="auraId in auraIds" :key="auraId" :aura-id="auraId" />
    <AFSStat />
    <ReservationStat />

    <MiscStat />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import AuraStat from './AuraStat.vue';
import AFSStat from './AFSStat.vue';
import MiscStat from './MiscStat.vue';
import ReservationStat from './ReservationStat.vue';
import { useAuras, useGlobalAuraEffect } from '~/composables/useAura.hooks';

export default defineComponent({
  components: {
    AuraStat,
    AFSStat,
    MiscStat,
    ReservationStat,
  },

  setup() {
    const { auras } = useAuras();
    const auraIds = computed(() => auras.value.keys());
    const { globalAuraEffect } = useGlobalAuraEffect();

    return { auraIds, globalAuraEffect };
  },
});
</script>

<style scoped lang="scss"></style>
