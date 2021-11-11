<template>
  <div class="aura-section row">
    <Col
      v-for="aura in auras.entries()"
      :key="aura[0]"
      :cols="cols"
    >
      <AuraLabel
        :key="aura[0]"
        :aura="aura[1]"
      />
    </Col>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { Vue3Mq } from '@/types';

import Col from '@/components/shared/Col.vue';
import AuraLabel from './AuraLabel.vue';

export default defineComponent({
  name: 'AuraSection',
  setup() {
    return {
      mq: inject('mq') as Vue3Mq,
    };
  },

  components: {
    Col,
    AuraLabel,
  },

  props: {
    auras: {
      type: Object,
      require: true,
    },
  },

  computed: {
    cols(): string {
      switch (this.mq.current) {
        case 'sm': return 'col-12';
        case 'md': return 'col-6';
        case 'lg': return 'col-4';
        case 'xl': return 'col-3';
      }
    },
  },
});

</script>

<style scoped lang="scss">
</style>