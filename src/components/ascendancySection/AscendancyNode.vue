<template>
  <label class="notable-label my-3">
    <img :class="isNotable ? 'notable-border' : 'small-node-border'" :src="nodeBorder" />
    <img :class="isNotable ? 'notable-bg' : 'small-node-bg'" :src="nodeBg" />

    <input
      :input="node.active"
      :disabled="!selected"
      class="me-1"
      type="checkbox"
      @input="$emit('toggle')"
    />
    {{ node.name }}
  </label>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import { imageUrl } from '~/composables/common.hook';
import AscNode from '~/models/AscNode';

export default defineComponent({
  props: {
    node: {
      type: Object as PropType<AscNode>,
      required: true,
    },

    isNotable: {
      type: Boolean,
      require: true,
    },

    selected: {
      type: Boolean,
      require: true,
    },
  },
  emits: ['toggle'],

  setup(props) {
    const nodeBorder = computed(() => {
      if (props.isNotable) {
        return props.node.active && props.selected
          ? imageUrl('img/borders/asc/asc_notable_active.png')
          : imageUrl('img/borders/asc/asc_notable.png');
      }

      return props.node.active && props.selected
        ? imageUrl('img/borders/asc/asc_small_active.png')
        : imageUrl('img/borders/asc/asc_small.png');
    });

    const imageClass = computed(() => (props.isNotable ? 'notable-border' : 'small-node-border'));

    const nodeBg = imageUrl(`img/${props.node.icon}`);

    return { imageClass, nodeBorder, nodeBg };
  },
});
</script>

<style scoped lang="scss">
.notable-label {
  position: relative;
  display: flex;
  align-items: center;
  text-shadow: -1.5px 0 black, 0 1.5px black, 1.5px 0 black, 0 -1.5px black;

  .notable-border {
    position: absolute;
    top: -5px;
    left: -5px;
    float: left;
    width: 45px;
    height: 45px;
  }

  .notable-bg {
    border-radius: 15px;
    width: 35px;
    height: 35px;
    float: left;
    margin-right: 0.9em;
  }

  .small-node-border {
    position: absolute;
    left: -5px;
    float: left;
    width: 28px;
    margin-left: 7px;
    height: 28px;
  }

  .small-node-bg {
    border-radius: 15px;
    width: 18px;
    height: 18px;
    float: left;
    margin-left: 7px;
    margin-right: 1.5em;
  }
}
</style>
