<template>
  <div>
    {{ key }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    acsendancy: {
      type: Object,
      require: true,
    }
  },

  computed: {
    key(): any {
      return this.$.vnode.key;
    }
  },

  mounted() {
    console.log(this.key, this.acsendancy);
  },
});

</script>

<style lang="scss">

</style>
