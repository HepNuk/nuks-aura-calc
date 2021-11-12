<template>
  <div class="title-header px-3 py-2">
    <h1>{{ title }}</h1>
    <div class="d-flex flex-row header-modals">
      <ChangesModal/>
      <KnownIssuesModal/>
    </div>
    <p v-if="version" class="mt-2 mb-0">
      <fa :icon="['fa','info-circle']"/>
      for Path of Exile version {{ version }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ChangesModal from '@/components/shared/ChangesModal.vue';
import KnownIssuesModal from '@/components/shared/KnownIssuesModal.vue';

export default defineComponent({
  components: {
    ChangesModal,
    KnownIssuesModal
  },

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