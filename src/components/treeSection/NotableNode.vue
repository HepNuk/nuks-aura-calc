<template>
  <label class="notable-label">
    <img v-if="notable.active" class="notable-border" src="@/assets/img/borders/notable_border_active.png">
    <img v-else class="notable-border" src="@/assets/img/borders/notable_border.png">
    <img class="notable-bg" :src="nodeBg">
    <input v-model="notable.active" class="me-1" type="checkbox">
    {{ notable.name }}
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    notable: {
      type: Object,
      require: true,
    }
  },

  computed: {
    active(): string {
      return this.notable.active ? 'active' : '';
    },

    nodeBg(): string {
      try {
        return require(`@/assets/img/${this.notable.icon}`);
      } catch {
        return require(`@/assets/img/Art/2DArt/SkillIcons/passives/missing.png`);
      }
    },
  }
});

</script>

<style scoped lang="scss">
.notable-label {
  position: relative;
  display: flex;
  align-items: center;

  .notable-border {
    position: absolute;
    top: -5px;
    left: -5px;
    float: left;
    width: 45px;
    height: 45px;
  }
  
  .notable-bg {
    border-radius: 5px;
    width: 35px;
    height: 35px;
    float: left;
    margin-right: 0.5em;
  }
}

</style>
