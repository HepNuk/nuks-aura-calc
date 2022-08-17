<template>
  <label class="small-node-label mb-1 mt-2">
    <img class="small-node-border" :src="nodeBorder" />
    <img class="small-node-bg" :src="nodeBg" />
    <input
      :input="nodeActive"
      class="me-1"
      type="checkbox"
      @change="$emit('toggle-node', !nodeActive)"
    />
    {{ `${node.value}% ${node.name}` }}
  </label>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import { imageUrl } from '~/composables/common.hook';
import TreeNode from '~/models/TreeNode';

export default defineComponent({
  props: {
    node: {
      type: Object as PropType<TreeNode>,
      required: true,
    },
  },

  emits: ['toggle-node'],

  setup(props) {
    const nodeActive = computed(() => props.node.active);
    const nodeBg = imageUrl(`img/${props.node.icon}`);
    const nodeInactiveBorder = imageUrl('img/borders/small_border.png');
    const nodeActiveBorder = imageUrl('img/borders/small_border_active.png');

    const nodeBorder = computed(() => (nodeActive.value ? nodeActiveBorder : nodeInactiveBorder));

    return {
      nodeBg,
      nodeActiveBorder,
      nodeBorder,
      nodeActive,
    };
  },
});
</script>

<style scoped lang="scss">
.small-node-label {
  position: relative;
  display: flex;
  align-items: center;

  .small-node-border {
    position: absolute;
    float: left;
    width: 28px;
    height: 28px;
    margin-left: 5px;
  }

  .small-node-bg {
    border-radius: 15px;
    width: 18px;
    height: 18px;
    float: left;
    margin-left: 10px;
    margin-right: 15px;
  }
}
</style>
