<template>
  <div class="collumn-item" :class="col">
    <div class="item">
      <slot/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, PropType } from 'vue';
import { Vue3Mq } from '@/types';

export default defineComponent({
  setup() {
    return {
      mq: inject('mq') as Vue3Mq,
    };
  },

  props: {
    cols: {
      type: String as PropType<string>,
      require: false,
      default: null,
    }
  },

  computed: {
    col() {
      if (this.cols) return this.cols;

      switch (this.mq.current) {
        case 'sm': return 'col-12';
        case 'md': return 'col-6';
        case 'lg': return 'col-4';
        case 'xl': return 'col-3';
      }
    },
  }


});

</script>

<style scoped lang="scss">
.collumn-item {
  padding: 0.3em;
}

.item {
  background-color: #111;
  border-radius: 5px;
  flex-direction: column;
  flex-wrap: nowrap;
}
</style>
