<template>
  <label class="jewel">
    <img :src="img" />
    <slot />
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { imageUrl } from '~/composables/common.hook';

export default defineComponent({
  props: {
    imgLink: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const img = imageUrl(props.imgLink);
    return { img };
  },
});
</script>

<style scoped lang="scss">
img {
  width: 35px;
  height: 35px;
  margin-right: 8px;
}
</style>
