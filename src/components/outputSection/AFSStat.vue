<template>
  <div>
    <template v-if="afsStatLines.length > 0">
      <li class="aura-name">Auras From Skills</li>
      <li v-for="(line, index) in afsStatLines" :key="'afs-' + index" class="aura-stat">
        {{ line }}
      </li>
      <li class="aura-stat separetor">
        ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
      </li>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import {
  useAscendancies,
  useAuras,
  useGlobalAuraEffect,
  useSupportGems,
} from '~/composables/useAura.hooks';
import type AFSstat from '~/models/AFSstat';

export default defineComponent({
  setup() {
    const { ascendancies } = useAscendancies();
    const { auras } = useAuras();
    const { supportGemsStatic } = useSupportGems();
    const { globalAuraEffect } = useGlobalAuraEffect();

    const afsAEArray = computed(() => {
      const afsAEArray: AFSstat[] = [];
      ascendancies.value.forEachAFSStat((asfNode) => {
        afsAEArray.push(asfNode);
      });
      return afsAEArray;
    });

    const afsStatLines = computed(() => {
      const auraEffects: number[] = [];
      auras.value.forEach((aura) => {
        auraEffects.push(
          aura.aurasFromSkillsHelperArray(globalAuraEffect.value, supportGemsStatic.value)
        );
      });

      const afsStatLines: string[] = [];
      afsAEArray.value.forEach((afs) => {
        const statLine = afs.getScaledStatLine(auraEffects);
        if (statLine) {
          afsStatLines.push(statLine);
        }
      });

      return afsStatLines;
    });

    return { afsAEArray, afsStatLines };
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
  text-align: justify;
}
</style>
