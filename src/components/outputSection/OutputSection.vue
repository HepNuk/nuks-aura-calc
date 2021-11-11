<template>
  <div class="output-section">
    <div class="sticky">
      <h1 class="mb-0">Aura Stats</h1>
      <p>{{ globalAuraEffect }}% Global Aura Effect</p>
    </div>

    <AuraStat 
      v-for="aura in auras"
      :key="aura[0]"
      :aura="aura[1]"
      :support-gems-static="supportGemsStatic"
      :global-aura-effect="globalAuraEffect"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AuraStat from './AuraStat.vue';

export default defineComponent({
  components: {
    AuraStat,
  },

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
