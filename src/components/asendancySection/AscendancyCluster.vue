<template>
  <div 
    class="asc-cluster"
    :class="selected ? 'asc-selected' : ''"
    :style="cssVars"
  >
    <h5 class="ms-1 mb-3 mt-1">{{ name }}</h5>
    <AscendancyNode
      v-for="node in ascendancy"
      class="ms-2"
      :key="node.id"
      :node="node"
      :selected="selected"
      :is-notable="node.isNotable || key === 'ascendant'"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AscendancyNode from './AscendancyNode.vue';

export default defineComponent({
  components: { AscendancyNode },
  props: {
    ascendancy: {
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
    },

    name(): string {
      return this.key.toUpperCase().charAt(0) + this.key.slice(1, this.key.length);
    }
  },
});

</script>

<style scoped lang="scss">
.asc-cluster{
  min-height: 295px;
  padding: 0.3em 0.5em 0.3em 0.5em;
  background-image: linear-gradient(rgba(0,0,0,var(--opacity)), rgba(0,0,0,var(--opacity))), var(--bg-image);
  background-position: left top;
  background-size: cover;
  border-radius: 5px;
  
  p {
    font-size: 18px;
  }
}

.asc-cluster:hover{
  background-image: linear-gradient(rgba(0,0,0,var(--hover-opac)), rgba(0,0,0,var(--hover-opac))), var(--bg-image);
}

.asc-selected{
  box-shadow:inset 0px 0px 0px 2px rgb(218,218,218,0.8);
}

</style>
