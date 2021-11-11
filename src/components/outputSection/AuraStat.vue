<template>
  <div v-if="aura.level > 0">
    <li class="aura-name">
      {{ aura.displayName }} ~ {{ aurasAuraEffect }}%
    </li>
    <li
      v-for="(line, index) in statLines"
      :key="aura.id + index"
      class="aura-stat"
    >
      {{ line }}
    </li>
    <li
      v-for="(line, index) in qualityStatLines"
      :key="aura.id + index"
      class="aura-stat"
    >
      {{ line }}
    </li>
    <li class="aura-stat separetor">
      ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
    </li>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    aura: {
      type: Object,
      require: true,
    },

    globalAuraEffect: {
      type: Number,
      require: false,
      default: 0,
    },

    supportGemsStatic: {
      type: Object,
      require: true,
    },
  },

  computed: {
    aurasAuraEffect() {
      return this.aura.auraEffectForGem(this.globalAuraEffect, this.supportGemsStatic);
    },

    statLines() {
      return this.aura.getStatLines(this.globalAuraEffect, this.supportGemsStatic);
    },

    qualityStatLines() {
      return this.aura.getQualityStatLines(this.globalAuraEffect, this.supportGemsStatic);
    }
  },

  mounted() {
    console.log(this.aura);
  }
});

</script>

<style scoped lang="scss">
li {
  list-style-type: none;
  font-size: 16px;
}

.aura-name {
  color: #dc4b4b;
}

.aura-stat {
  color:rgb(255, 255, 255);
  font-size: 14px;
}

.separetor {
  text-align: justify;
}
</style>
