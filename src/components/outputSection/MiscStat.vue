<template>
  <div>
    <template v-if="miscStats.length > 0">
      <li class="aura-name">Misc Bonuses</li>
      <li v-for="(line, index) in miscStats" :key="'afs-' + index" class="aura-stat">
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
import { useAscendancies } from '~/composables/useAura.hooks';

export default defineComponent({
  setup() {
    const { ascendancies } = useAscendancies();
    const miscStats = computed(() => {
      const miscStats: string[] = [];

      ascendancies.value.forEachMiscStat((stat: string) => miscStats.push(stat));
      return miscStats;
    });

    return { miscStats };
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
