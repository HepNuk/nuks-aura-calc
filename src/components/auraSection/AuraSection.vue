<template>
  <div class="aura-section row">
    <AuraLabel
      v-for="playerAura in playerAuras.entries()"
      :key="playerAura[0]"
      :player-aura="playerAura[1]"
      :alt-quality-count="auraStatic.get(playerAura[0]).qualityStats.length"
      :class="cols"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { Vue3Mq } from '@/types';

import AuraLabel from './AuraLabel.vue';

export default defineComponent({
  name: 'AuraSection',
  setup() {
    return {
      mq: inject('mq') as Vue3Mq,
    };
  },

  components: {
    AuraLabel,
  },

  props: {
    playerAuras: {
      type: Object,
      require: true,
    },

    auraStatic: {
      type: Object,
      require: true,
    }
  },

  computed: {
    cols() {
      switch (this.mq.current) {
        case 'sm': return 'col-12';
        case 'md': return 'col-6';
        case 'lg': return 'col-4';
        case 'xl': return 'col-3';
      }
    },
  },

  mounted() {
    console.log(this.playerAuras);
  },

  methods: {
  },
});

</script>

<style lang="scss">
</style>