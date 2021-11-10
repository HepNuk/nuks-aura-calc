<template>
  <div class="aura-section row">
    <AuraLabel
      v-for="aura in auras.entries()"
      :key="aura[0]"
      :aura="aura[1]"
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
    auras: {
      type: Object,
      require: true,
    },
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
    console.log(this.auras);
  },

  methods: {
  },
});

</script>

<style lang="scss">
</style>