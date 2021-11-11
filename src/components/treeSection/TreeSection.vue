<template>
  <div class="tree-section row">
    <Col
      v-for="cluster in passiveTree.treeClusters"
      :key="cluster[0]"
      :cols="cols"
    >
      <TreeCluster
        :key="cluster[0]"
        :group="cluster[0]"
        :cluster="cluster[1]"
      />
    </Col>
  
    <!-- TODO: Make Jewels better someday.. -->
    <Col
      v-for="(jewel, i) in jewels"
      :key="`jewel-${i}`"
      :cols="cols"
    >
      <Jewel :imgLink="jewel.img">
        <input v-if="jewel.toggle" v-model="jewel.model" class="me-1" type="checkbox">
        <input v-else v-model="jewel.model" class="ms-auto" type="number" min="0" max="100" placeholder="AuraEffect" >
        {{ jewel.title }}
      </Jewel>
    </Col>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { Vue3Mq } from '@/types';

import TreeCluster from './TreeCluster.vue';
import Jewel from './Jewel.vue';
import Col from '../shared/Col.vue';

export default defineComponent({
  name: 'TreeSection',
  setup() {
    return {
      mq: inject('mq') as Vue3Mq,
    };
  },

  components: {
    TreeCluster,
    Jewel,
    Col,
  },
  props: {
    passiveTree: {
      type: Object,
      require: true,
    }
  },

  computed: {
    cols() {
      switch (this.mq.current) {
        case 'xs': return 'col-12';
        case 'sm': return 'col-6';
        case 'md': return 'col-4';
        case 'lg': return 'col-3';
        case 'xl': return 'col-2';
      }
    },

    jewels() {
      return [
        { title: 'Conqueror\'s Potency', img: 'img/tree/potency.png', model: this.passiveTree.potency, toggle: true },
        { title: 'Timeless Jewel', img: 'img/tree/timeless.png', model: this.passiveTree.timelessJewel },
        { title: 'Cluster Jewel', img: 'img/tree/cluster.png', model: this.passiveTree.clusterJewels },
      ];
    }
  },
});

</script>

<style scoped lang="scss">

</style>
