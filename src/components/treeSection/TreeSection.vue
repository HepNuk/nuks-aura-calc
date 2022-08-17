<template>
  <div class="tree-section row">
    <MyCol v-for="clusterId in treeClusters.keys()" :key="clusterId" :cols="bootstrapColClass">
      <TreeCluster :key="clusterId" :cluster-group-id="clusterId" />
    </MyCol>

    <!-- FIXME: Refactor this, Make Jewels better someday.. -->
    <MyCol :cols="bootstrapColClass">
      <JewelSocket img-link="img/tree/potency.png">
        <input v-model="potency" class="me-1" type="checkbox" />
        Conqueror's Potency
      </JewelSocket>
    </MyCol>

    <MyCol :cols="bootstrapColClass">
      <JewelSocket img-link="img/tree/timeless.png">
        <input
          v-model="timelessJewel"
          class="ms-auto"
          type="number"
          min="0"
          max="100"
          placeholder="AuraEffect"
        />
        Timeless Jewel
      </JewelSocket>
    </MyCol>

    <MyCol :cols="bootstrapColClass">
      <JewelSocket img-link="img/tree/cluster.png">
        <input
          v-model="clusterJewels"
          class="ms-auto"
          type="number"
          min="0"
          max="100"
          placeholder="AuraEffect"
        />
        Cluster Jewel
      </JewelSocket>
    </MyCol>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

import TreeCluster from './TreeCluster.vue';
import JewelSocket from './JewelSocket.vue';
import { useMq } from '~/composables/common.hook';
import { useJewelSockets, usePassiveTreeClusters } from '~/composables/useAura.hooks';

export default defineComponent({
  name: 'TreeSection',

  components: {
    TreeCluster,
    JewelSocket,
  },

  setup() {
    const { mq } = useMq();
    const { treeClusters } = usePassiveTreeClusters();
    const { potency, clusterJewels, timelessJewel } = useJewelSockets();

    const bootstrapColClass = computed(() => {
      console.log('tree', mq.value);
      switch (mq.value) {
        case 'xs':
          return 'col-12';
        case 'sm':
          return 'col-6';
        case 'md':
          return 'col-4';
        case 'lg':
          return 'col-3';
        default:
          return 'col-2';
      }
    });

    return {
      potency,
      clusterJewels,
      timelessJewel,
      treeClusters,
      mq,
      bootstrapColClass,
    };
  },
});
</script>

<style scoped lang="scss"></style>
