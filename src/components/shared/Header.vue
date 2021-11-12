<template>
  <div class="title-header px-3 py-2">
    <h1>{{ title }} | Version: {{ ver }} {{ beta }}</h1>
    <div class="d-flex flex-row header-modals mb-2">
      <ChangesModal/>
      <KnownIssuesModal/>
      <p v-if="version" class="mt-2 mb-0 ms-2">
        <fa :icon="['fa','info-circle']"/>
        For Path of Exile version {{ version }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ChangesModal from '@/components/shared/ChangesModal.vue';
import KnownIssuesModal from '@/components/shared/KnownIssuesModal.vue';
import changes from '@/assets/informationJsons/changes.json';

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
  },

  computed: {
    ver(): string {
      return changes[0].version.join('.');
    },

    beta(): string {
      return changes[0].beta ? '(Beta)' : '';
    }
  }
});

</script>

<style scoped lang="scss">
</style>