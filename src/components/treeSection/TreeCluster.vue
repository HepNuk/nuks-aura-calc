<template>
  <div class="tree-cluster-label">
    <div class="cluster">
      <NotableNode class="node mb-1" :notable="cluster.notable"/>
      <SmallNode 
        v-for="(node, i) in cluster.smallNodes"
        :key="'smallNode-' + i"
        :node="node"
        class="node" 
        
      />
    </div>
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

<style lang="scss">
.tree-cluster-label {
  padding: 0.4em;
}
.cluster {
  background-color: #111;
  border-radius: 5px;
  flex-direction: column;
  flex-wrap: nowrap;
}
.node {
  height: 35px;
  width: 100%;
}

</style>
