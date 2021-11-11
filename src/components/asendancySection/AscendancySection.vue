<template>
  <div class="row">
    <Col 
      v-for="ascendancy in ascendancies.ascendancyTrees"
      :key="ascendancy[0]"
    >
      <AscendancyCluster
        :key="ascendancy[0]"
        :ascendancy="ascendancy[1].sort((a, b) => {
          if (a.isNotable && b.isNotable) return 0;
          if (a.isNotable) return -1;
          if (b.isNotable) return 1;
          return 0
        })"
        :selected="(ascendancies.ascendancy === ascendancy[0])"
        @click="ascendancies.selectAscendancy(ascendancy[0])"
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

<style scoped lang="scss">

</style>