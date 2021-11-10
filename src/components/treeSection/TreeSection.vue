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
      :class="cols"
      img-link="img/tree/potency.png"
    >
      <input v-model="passiveTree.potency" class="me-1" type="checkbox">
      Conqueror's Potency 
    </Jewel>
    
    <Jewel 
      :class="cols"
      img-link="img/tree/timeless.png"
    >
      <input v-model="passiveTree.timelessJewel" class="ms-auto" type="number" min="0" max="100" placeholder="AuraEffect" >
      Timeless Jewel 
    </Jewel>

    <Jewel 
      :class="cols"
      img-link="img/tree/cluster.png"
    >
      <input v-model="passiveTree.clusterJewels" class="ms-auto" type="number" min="0" max="100" placeholder="AuraEffect" >
      Cluster Jewel 
    </Jewel>
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
