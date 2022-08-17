<template>
  <label class="notable-label">
    <img class="notable-border" :src="nodeBorder" />
    <img class="notable-bg" :src="nodeBg" />
    <input
      :value="notableActive"
      class="me-1"
      type="checkbox"
      @change="$emit('toggle-notable', !notableActive)"
    />
    {{ notable.name }}
  </label>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import { imageUrl } from '~/composables/common.hook';
import TreeNode from '~/models/TreeNode';

export default defineComponent({
  props: {
    notable: {
      type: Object as PropType<TreeNode>,
      required: true,
    },
  },
  emits: ['toggle-notable'],

  setup(props) {
    const notableActive = computed(() => props.notable.active);
    const nodeBg = imageUrl(`img/${props.notable.icon}`);
    const nodeInactiveBorder = imageUrl('img/borders/notable_border.png');
    const nodeActiveBorder = imageUrl('img/borders/notable_border_active.png');

    const nodeBorder = computed(() =>
      notableActive.value ? nodeActiveBorder : nodeInactiveBorder
    );

    return {
      nodeBg,
      nodeActiveBorder,
      nodeBorder,
      notableActive,
    };
  },
});
</script>

<style scoped lang="scss">
.notable-label {
  position: relative;
  display: flex;
  align-items: center;

  .notable-border {
    position: absolute;
    top: -5px;
    left: -5px;
    float: left;
    width: 45px;
    height: 45px;
  }

  .notable-bg {
    border-radius: 5px;
    width: 35px;
    height: 35px;
    float: left;
    margin-right: 0.5em;
  }
}
</style>
