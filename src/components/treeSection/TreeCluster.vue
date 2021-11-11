<template>
  <div class="tree-cluster-label">
    <NotableNode class="node mb-1" :notable="cluster.notable"/>
    <SmallNode 
      v-for="(node, i) in cluster.smallNodes"
      :key="'smallNode-' + i"
      :node="node"
      class="small-node" 
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NotableNode from './NotableNode.vue';
import SmallNode from './SmallNode.vue';


export default defineComponent({
  name: 'TreeClsuter',

  components: {
    NotableNode,
    SmallNode,
  },

  props: {
    group: {
      type: Number,
      require: true,
    },

    cluster: {
      type: Object,
      require: true,
    }
  },


});

</script>

<style scoped lang="scss">
.small-node {
  padding-bottom: 0.5rem;
}

</style>
