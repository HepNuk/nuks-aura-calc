<template>
  <div class="aura-app">
    <MainHeader title="Nuk's PoE Aura stats calculator" version="3.16" />
    <MySpinner v-if="loading" />
    <MyInput type="number" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import MainHeader from './components/shared/MainHeader.vue';

export default defineComponent({
  components: { MainHeader },

  setup() {
    const loading = ref(true);

    return { loading };
  },
});
</script>

<style scoped></style>
