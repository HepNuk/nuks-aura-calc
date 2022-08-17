<template>
  <div class="output-section">
    <div class="sticky">
      <h1 class="mb-0">Aura Stats</h1>
      <p>{{ globalAuraEffect }}% Global Aura Effect</p>
    </div>

    <AuraStat v-for="aura in auraEntries" :id="aura[0]" :key="aura[0]" />

    <!-- <AFSStat
      v-bind="{
        auras,
        supportGemsStatic,
        globalAuraEffect,
        ascendancies,
        passiveTree,
      }"
    />

    <ReservationStat
      v-bind="{
        auras,
        supportGemsStatic,
        globalAuraEffect,
        ascendancies,
        passiveTree,
        reservedValues,
      }"
    />

    <MiscStat
      v-bind="{
        auras,
        supportGemsStatic,
        globalAuraEffect,
        ascendancies,
        passiveTree,
      }"
    /> -->
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
    const auraEntries = computed(() => auras.value.entries());
    const { globalAuraEffect } = useGlobalAuraEffect();

    return { auraEntries, globalAuraEffect };
  },
});
</script>

<style scoped lang="scss"></style>
