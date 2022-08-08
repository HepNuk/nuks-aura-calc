<template>
  <input />
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
input {
  border: 1px solid #ccc;
  background: #222;
  font-size: 14px;
  color: #fff;
  line-height: 25px;
  padding: 0 2px;
  margin-right: 3px;

  [type='number'] {
    width: 45px;
  }
}
</style>
