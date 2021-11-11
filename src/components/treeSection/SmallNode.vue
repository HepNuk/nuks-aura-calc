<template>
  <label class="small-node-label mb-1 mt-2">
    <img v-if="node.active" class="small-node-border " src="@/assets/img/borders/small_border_active.png">
    <img v-else class="small-node-border" src="@/assets/img/borders/small_border.png">
    <img class="small-node-bg" :src="nodeBg">
    <input v-model="node.active" class="me-1" type="checkbox">
    {{ `${node.value}% ${node.name}` }}
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    node: {
      type: Object,
      require: true,
    }
  },

  computed: {
    nodeBg(): string {
      try {
        return require(`@/assets/img/${this.node.icon}`);
      } catch {
        return require(`@/assets/img/Art/2DArt/SkillIcons/passives/missing.png`);
      }
    },
  },
});

</script>

<style scoped lang="scss">
.small-node-label {
  position: relative;
  display: flex;
  align-items: center;

  .small-node-border {
    position: absolute;
    z-index: 10;
    float: left;
    width: 28px;
    height: 28px;
    margin-left: 5px;
  }
  
  .small-node-bg {
    border-radius: 15px;
    width: 18px;
    height: 18px;
    float: left;
    margin-left: 10px;
    margin-right: 15px;
  }
}
</style>
