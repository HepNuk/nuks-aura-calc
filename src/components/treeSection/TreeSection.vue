<template>
  <div class="tree-section row">
    <TreeCluster
      v-for="cluster in passiveTree.treeClusters"
      :class="cols"
      :key="cluster[0]"
      :group="cluster[0]"
      :cluster="cluster[1]"
    />

    <Jewel 
      :value="passiveTree.potency" 
      :class="cols"
      title="Conqueror's Potency"
      variant="toggle" 
      img-link="img/tree/potency.png"
      @update="(e) => passiveTree.potency = e"
    />

    <Jewel 
      :value="passiveTree.timelessJewel"
      :class="cols"
      title="Timeless Jewel "
      variant="number"
      img-link="img/tree/timeless.png"
      @update="(e) => passiveTree.timelessJewel = e"
    />

    <Jewel 
      :value="passiveTree.clusterJewels"
      :class="cols"
      title="Cluster Jewels"
      variant="number"
      img-link="img/tree/cluster.png"
      @update="(e) => passiveTree.clusterJewel = e"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { Vue3Mq } from '@/types';

import TreeCluster from './TreeCluster.vue';
import Jewel from './Jewel.vue';

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
  },
});

</script>

<style lang="scss">

</style>
