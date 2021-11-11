<template>
  <div 
    class="asc-cluster"
    :class="selected ? 'asc-selected' : ''"
    :style="cssVars"
  >
    <div class="asc-bg"/>
    <br>
    {{ key }}<br>
    {{ key }}<br>
    {{ key }}<br>
    {{ key }}<br>
    {{ key }}<br>
    {{ key }}<br>
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
    },

    selected: {
      type: Boolean,
      require: true,
    }
  },

  computed: {
    key(): any {
      return this.$.vnode.key;
    },

    image() {
      return  require(`@/assets/img/borders/asc/${this.key}_bg.png`);
    },

    cssVars() {
      return {
        '--bg-image': `url('${this.image}')`,
        '--opacity': this.opacity,
        '--hover-opac': 0.4,
      };
    },

    opacity(): number {
      if (this.selected) return 0.4;
      return 0.8;
    }
  },

  mounted() {
    console.log(this.key, this.acsendancy);
  },
});

</script>

<style scoped lang="scss">
.asc-cluster{
  padding: 0.3em 0.5em 0.3em 0.5em;
  background-image: linear-gradient(rgba(0,0,0,var(--opacity)), rgba(0,0,0,var(--opacity))), var(--bg-image);
  background-position: left top;
  background-size: cover;
  border-radius: 5px;
}

.asc-cluster:hover{
  background-image: linear-gradient(rgba(0,0,0,var(--hover-opac)), rgba(0,0,0,var(--hover-opac))), var(--bg-image);
}

.asc-selected{
  box-shadow:inset 0px 0px 0px 2px rgb(218,218,218,0.75);
}

</style>
