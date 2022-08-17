<template>
  <div>
    <template v-if="resStatArray.length > 0">
      <li class="aura-name">Reservation Based Buffs</li>
      <li v-for="(line, index) in resStatArray" :key="'resstat-' + index" class="aura-stat">
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
import { useAscendancies, useReserverstions } from '~/composables/useAura.hooks';

export default defineComponent({
  setup() {
    const { ascendancies } = useAscendancies();
    const { reservedValues } = useReserverstions();

    const resStatArray = computed(() => {
      const resStatArray: string[] = [];
      ascendancies.value.forEachReservationBasedStat((resStat) => {
        const statLine = resStat.getScaledStatLine(reservedValues);
        if (statLine) {
          resStatArray.push(statLine);
        }
      });
      return resStatArray;
    });

    return { resStatArray };
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
