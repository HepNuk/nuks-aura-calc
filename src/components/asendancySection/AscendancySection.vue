<template>
  <div class="row">
    <Col 
      v-for="acsendancy in ascendancies.ascendancyTrees"
      :key="acsendancy[0]"
    >
      <AscendancyCluster
        :key="acsendancy[0]"
        :acsendancy="acsendancy[1]"
      />
    </Col>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { Vue3Mq } from '@/types';

import Col from '@/components/shared/Col.vue';
import AscendancyCluster from './AscendancyCluster.vue';

export default defineComponent({
  name: 'AscendancySection',
  setup() {
    return {
      mq: inject('mq') as Vue3Mq,
    };
  },

  components: {
    Col,
    AscendancyCluster,
  },

  props: {
    ascendancies: {
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
    console.log(this.ascendancies);
  },

  methods: {
  },
});

</script>

<style lang="scss">

</style>