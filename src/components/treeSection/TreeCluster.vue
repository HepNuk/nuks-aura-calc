<template>
  <div class="tree-cluster-label">
    <NotableNode class="node mb-1" :notable="cluster.notable" @toggle-notable="toggleNotable" />
    <SmallNode
      v-for="(node, i) in cluster.smallNodes"
      :key="'smallNode-' + i"
      :node="node"
      class="small-node"
      @toggle-node="toggleSmallNode(i)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useCluster } from '~/composables/useAura.hooks';
import NotableNode from './NotableNode.vue';
import SmallNode from './SmallNode.vue';

export default defineComponent({
  name: 'TreeClsuter',

  components: {
    NotableNode,
    SmallNode,
  },

  props: {
    clusterGroupId: {
      type: Number,
      required: true,
    },
  },

  setup(props) {
    const { cluster, toggleNotable, toggleSmallNode } = useCluster(props.clusterGroupId);
    return { toggleSmallNode, toggleNotable, cluster };
  },
});
</script>

<style scoped lang="scss">
.small-node {
  padding-bottom: 0.5rem;
}
</style>
