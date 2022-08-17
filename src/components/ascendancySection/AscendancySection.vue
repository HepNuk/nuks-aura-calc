<template>
  <MyRow>
    <MyCol v-for="ascendancyId in ascendancyTreeIds" :key="ascendancyId">
      <!-- :cols="bootstrapColClass || 'col-12'" -->
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

    const ascendancyTreeIds = computed(() => ascendancyTrees.keys());
    const bootstrapColClass = computed(() => {
      switch (mq.value) {
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

    return {
      selectAscendancy,
      ascendancyTreeIds,
      ascendancyTrees,
      currentAscendancy,
      bootstrapColClass,
    };
  },
});
</script>

<style scoped lang="scss"></style>
