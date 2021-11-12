<template>
  <div>
    <template v-if="miscStats.length > 0">
      <li class="aura-name">
        Misc Bonuses
      </li>
      <li
        v-for="(line, index) in miscStats"
        :key="'afs-' + index"
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
  },

  data() {
    return {
      // afsAEArray: [] as number[],
    };
  },

  computed: {
    miscStats(): string[] {
      const array: string[] = [];

      this.ascendancies.forEachMiscStat((stat: string) => {
        array.push(stat);
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
