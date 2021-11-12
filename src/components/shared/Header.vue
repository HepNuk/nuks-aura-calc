<template>
  <div class="title-header px-3 py-2">
    <h1>{{ title }} | <a href="https://github.com/HepNuk/nuks-aura-calc/issues">Known Issues</a></h1>
    <p v-if="version" class="mb-0">
      <fa :icon="['fa','info-circle']"/>
      for Path of Exile version {{ version }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    title: {
      type: String,
      require: true,
    },

    version: {
      type: String,
      require: false,
      default: null,
    }
  }
});

</script>

<style scoped lang="scss">
</style>