<template>
  <div class="jewel">
    <img :src="img">
    <slot/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    imgLink: {
      type: String,
      require: true,
    },
  },

  computed: {
    img() {
      try {
        return require(`@/assets/${this.imgLink}`);
      } catch {
        return require('@/assets/img/tree/missing.png');
      }
    },
  }
});

</script>

<style scoped lang="scss">
img {
  width: 35px;
  height: 35px;
  margin-right: 8px;
}
</style>
