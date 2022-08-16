<template>
  <MyRow class="aura-section">
    <MyCol v-for="aura in auraEntries" :key="aura[0]">
      <AuraLabel :id="aura[0]" :key="aura[0]" />
    </MyCol>

    <MyCol>
      <Reservations />
    </MyCol>
  </MyRow>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

import AuraLabel from './AuraLabel.vue';
import Reservations from './Reservations.vue';
import { useAuras } from '~/composables/useAura.hooks';

export default defineComponent({
  name: 'AuraSection',

  components: {
    AuraLabel,
    Reservations,
  },

  setup() {
    const { auras } = useAuras();
    const auraEntries = computed(() => auras.value.entries());
    return { auraEntries };
  },
});
</script>

<style scoped lang="scss"></style>
