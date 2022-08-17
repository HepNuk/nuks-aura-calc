<template>
  <div class="collumn-item" :class="bootstrapColClass">
    <div class="item">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';
import { useMq } from '~/composables/common.hook';

export default defineComponent({
  props: {
    cols: {
      type: String as PropType<string>,
      require: false,
      default: null,
    },
  },

  setup(props) {
    const { mq } = useMq();

    const bootstrapColClass = computed(() => {
      if (props.cols) {
        return props.cols;
      }
      switch (mq.value) {
        case 'xs':
        case 'sm':
          return 'col-12';
        case 'md':
          return 'col-6';
        case 'lg':
          return 'col-4';
        default:
          return 'col-3';
      }
    });

    return { bootstrapColClass };
  },
});
</script>

<style scoped lang="scss">
.collumn-item {
  padding: 0.3em;
}

.item {
  background-color: rgb(0, 2, 2);
  border-radius: 5px;
  flex-direction: column;
  flex-wrap: nowrap;
}
</style>
