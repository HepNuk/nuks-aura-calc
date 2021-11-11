<template>
  <div class="output-section">
    <div class="sticky">
      <h1 class="mb-0">Aura Stats</h1>
      <p>{{ globalAuraEffect }}% Global Aura Effect</p>
    </div>


  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    globalAuraEffect: {
      type: Number,
      require: false,
      default: 0,
    },

    auras: {
      type: Object,
      require: true,
    },

    ascendancies: {
      type: Object,
      require: true,
    },

    passiveTree: {
      type: Object,
      require: true,
    },

    supportGemsStatic: {
      type: Object,
      require: true,
    },
  },
});

</script>

<style scoped lang="scss">

</style>
