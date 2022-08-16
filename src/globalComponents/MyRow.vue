<template>
  <div class="row">
    <slot />
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

      switch (mq.current) {
        case 'sm':
          return 'col-12';
        case 'md':
          return 'col-6';
        case 'lg':
          return 'col-4';
        case 'xl':
          return 'col-3';
        default:
          return 'col-3';
      }
    });

    return { bootstrapColClass };
  },
});
</script>

<style scoped lang="scss"></style>
