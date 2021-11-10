<template>
  <div class="tree-section row">
    <TreeCluster
      v-for="cluster in passiveTree.treeClusters"
      :class="cols"
      :key="cluster[0]"
      :group="cluster[0]"
      :cluster="cluster[1]"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import TreeCluster from './TreeCluster.vue';
import { Vue3Mq } from '@/types';

export default defineComponent({
  name: 'TreeSection',
  setup() {
    return {
      mq: inject('mq') as Vue3Mq,
    };
  },
  components: {
    TreeCluster,
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
