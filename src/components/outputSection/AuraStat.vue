<template>
  <div v-if="aura.level > 0">
    <li class="aura-name">{{ aura.displayName }} ~ {{ aurasAuraEffect }}%</li>
    <li v-for="(line, index) in statLines" :key="aura.id + index" class="aura-stat">
      {{ line }}
    </li>
    <li v-for="(line, index) in qualityStatLines" :key="aura.id + index" class="aura-stat">
      {{ line }}
    </li>
    <li class="aura-stat separetor">
      ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
    </li>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useAura, useGlobalAuraEffect, useSupportGems } from '~/composables/useAura.hooks';

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const { aura } = useAura(props.id);
    const { supportGemsStatic } = useSupportGems();
    const { globalAuraEffect } = useGlobalAuraEffect();

    const aurasAuraEffect = computed(() =>
      aura.auraEffectForGem(globalAuraEffect.value, supportGemsStatic.value)
    );
    const statLines = computed(() =>
      aura.getStatLines(globalAuraEffect.value, supportGemsStatic.value)
    );
    const qualityStatLines = computed(() =>
      aura.getQualityStatLines(globalAuraEffect.value, supportGemsStatic.value)
    );

    return { aura, aurasAuraEffect, statLines, qualityStatLines };
  },
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
  color: rgb(141, 173, 219);
  font-size: 15px;
}

.separetor {
  color: rgb(179, 189, 206);
  text-align: justify;
}
</style>
