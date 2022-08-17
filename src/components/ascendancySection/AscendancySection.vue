<template>
  <MyRow>
    <MyCol v-for="ascendancyId in ascendancyTreeIds" :key="ascendancyId" :cols="bootstrapColsClass">
      <AscendancyCluster
        :ascendancy-id="ascendancyId"
        :selected="currentAscendancy === ascendancyId"
        @click="selectAscendancy(ascendancyId)"
      />
    </MyCol>
  </MyRow>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useMq } from '~/composables/common.hook';
import { useAscendancyTree, useCurrentAscendancy } from '~/composables/useAura.hooks';
import AscendancyCluster from './AscendancyCluster.vue';

export default defineComponent({
  name: 'AscendancySection',

  components: {
    AscendancyCluster,
  },

  setup() {
    const { mq } = useMq();
    const { ascendancyTrees, selectAscendancy } = useAscendancyTree();
    const { currentAscendancy } = useCurrentAscendancy();
    const bootstrapColsClass = computed(() => {
      switch (mq.current) {
        case 'xs':
        case 'sm':
          return 'col-12';
        case 'md':
        case 'lg':
          return 'col-6';
        default:
          return 'col-3';
      }
    });

    const ascendancyTreeIds = computed(() => ascendancyTrees.keys());

    return {
      selectAscendancy,
      ascendancyTreeIds,
      ascendancyTrees,
      currentAscendancy,
      bootstrapColsClass,
    };
  },
});
</script>

<style scoped lang="scss"></style>
