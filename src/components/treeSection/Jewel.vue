<template>
  <label class="jewel-label">
    <div class="jewel">
      <img :src="img">
      <slot/>
    </div>
  </label>
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

<style lang="scss">
.jewel-label {
  padding: 0.4em;
}
.jewel {
  background-color: #111;
  border-radius: 5px;
  flex-direction: column;
  flex-wrap: nowrap;

  img {
    width: 35px;
    height: 35px;
    margin-right: 8px;
  }
}
</style>
