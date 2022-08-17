<template>
  <div>
    <template v-if="resStatArray.length > 0">
      <li class="aura-name">
        Reservation Based Buffs
      </li>
      <li
        v-for="(line, index) in resStatArray"
        :key="'resstat-' + index"
        class="aura-stat"
      >
        {{ line }}
      </li>
      <li class="aura-stat separetor">
        ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
      </li>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ReservationBasedStat from '@/models/ReservationBasedStat';

export default defineComponent({
  props: {
    auras: {
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

    ascendancies: {
      type: Object,
      require: true,
    },

    passiveTree: {
      type: Object,
      require: true,
    },

    reservedValues: {
      type: Object,
      require: true,
    },
  },

  computed: {
    resStatArray(): string[] {
      const array: string[] = [];

      this.ascendancies.forEachReservationBasedStat((resStat: ReservationBasedStat) => {
        const statLine = resStat.getScaledStatLine(this.reservedValues);
        if (statLine) array.push(statLine);
      });

      return array;
    },
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
  color:rgb(141, 173, 219);
  font-size: 15px;
}

.separetor {
  text-align: justify;
}
</style>
