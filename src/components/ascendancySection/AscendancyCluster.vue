<template>
  <div class="asc-cluster" :class="{ 'asc-selected': selected }" :style="cssVars">
    <h5 class="ms-1 mb-3 mt-1">{{ name }}</h5>
    <AscendancyNode
      v-for="node in ascendancy"
      :key="node.id"
      class="ms-2"
      :node="node"
      :selected="selected"
      :is-notable="node.isNotable || ascendancyId === 'ascendant'"
      @toggle="node.active != node.active"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { imageUrl } from '~/composables/common.hook';
import { useAscendancy } from '~/composables/useAura.hooks';
import AscendancyNode from './AscendancyNode.vue';

export default defineComponent({
  components: { AscendancyNode },
  props: {
    ascendancyId: {
      type: String,
      required: true,
    },

    selected: {
      type: Boolean,
      require: true,
    },
  },

  setup(props) {
    const { ascendancy } = useAscendancy(props.ascendancyId);

    const name = computed(
      () =>
        props.ascendancyId.toUpperCase().charAt(0) +
        props.ascendancyId.slice(1, props.ascendancyId.length)
    );

    const bgImage = imageUrl(`img/borders/asc/${props.ascendancyId}_bg.png`);
    const opacity = computed(() => (props.selected ? 0.4 : 0.8));
    const cssVars = computed(() => ({
      '--bg-image': `url('${bgImage}')`,
      '--opacity': opacity.value,
      '--hover-opac': 0.4,
    }));

    return {
      bgImage,
      opacity,
      cssVars,
      ascendancy,
      name,
    };
  },
});
</script>

<style scoped lang="scss">
.asc-cluster {
  min-height: 295px;
  padding: 0.3em 0.5em 0.3em 0.5em;
  background-image: linear-gradient(rgba(0, 0, 0, var(--opacity)), rgba(0, 0, 0, var(--opacity))),
    var(--bg-image);
  background-position: left top;
  background-size: cover;
  border-radius: 5px;

  p {
    font-size: 18px;
  }
}

.asc-cluster:hover {
  background-image: linear-gradient(
      rgba(0, 0, 0, var(--hover-opac)),
      rgba(0, 0, 0, var(--hover-opac))
    ),
    var(--bg-image);
}

.asc-selected {
  box-shadow: inset 0px 0px 0px 2px rgb(218, 218, 218, 0.8);
}
</style>
