<template>
  <label class="notable-label my-3">
    <template v-if="isNotable">
      <img v-if="node.active && selected" class="notable-border" src="@/assets/img/borders/asc/asc_notable_active.png">
      <img v-else class="notable-border" src="@/assets/img/borders/asc/asc_notable.png">
      <img class="notable-bg" :src="nodeBg">
    </template>
    <template v-else>
      <img v-if="node.active && selected" class="small-node-border" src="@/assets/img/borders/asc/asc_small_active.png">
      <img v-else class="small-node-border" src="@/assets/img/borders/asc/asc_small.png">
      <img class="small-node-bg" :src="nodeBg">
    </template>

    <input v-model="node.active" :disabled="!selected" class="me-1" type="checkbox">
    {{ node.name }}
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    node: {
      type: Object,
      require: true,
    },

    isNotable: {
      type: Boolean,
      require: true,
    },

    selected: {
      type: Boolean,
      require: true,
    }
  },

  computed: {
    active(): string {
      return this.node.active ? 'active' : '';
    },

    nodeBg() {
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
.notable-label {
  position: relative;
  display: flex;
  align-items: center;
  text-shadow: -1.5px 0 black, 0 1.5px black, 1.5px 0 black, 0 -1.5px black;

  .notable-border {
    position: absolute;
    top: -5px;
    left: -5px;
    z-index: 10;
    float: left;
    width: 45px;
    height: 45px;
  }
  
  .notable-bg {
    border-radius: 15px;
    width: 35px;
    height: 35px;
    float: left;
    margin-right: 0.9em;
  }

  .small-node-border {
    position: absolute;
    left: -5px;
    z-index: 10;
    float: left;
    width: 28px;
    margin-left: 7px;
    height: 28px;
  }
  
  .small-node-bg {
    border-radius: 15px;
    width: 18px;
    height: 18px;
    float: left;
    margin-left: 7px;
    margin-right: 1.5em;
  }
}

</style>
