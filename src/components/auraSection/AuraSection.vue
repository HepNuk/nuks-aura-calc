<template>
  <MyRow class="aura-section">
    <MyCol v-for="auraId in auraIds" :key="auraId">
      <AuraLabel :key="auraId" :aura-id="auraId" />
    </MyCol>

    <MyCol>
      <LifeAndManaReservations />
    </MyCol>
  </MyRow>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

import AuraLabel from './AuraLabel.vue';
import LifeAndManaReservations from './LifeAndManaReservations.vue';
import { useAuras } from '~/composables/useAura.hooks';

export default defineComponent({
  name: 'AuraSection',

  components: {
    AuraLabel,
    LifeAndManaReservations,
  },

  setup() {
    const { auras } = useAuras();
    const auraIds = computed(() => auras.value.keys());
    return { auraIds };
  },
});
</script>

<style scoped lang="scss"></style>
