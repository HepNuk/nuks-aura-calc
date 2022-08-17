<template>
  <div>
    <template v-if="afsStatLines.length > 0">
      <li class="aura-name">
        Auras From Skills
      </li>
      <li
        v-for="(line, index) in afsStatLines"
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
import AFSstat from '@/models/AFSstat';

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
    afsAEArray(): AFSstat[] {
      const array: AFSstat[] = [];

      this.ascendancies.forEachAFSStat((asfNode: AFSstat) => {
        array.push(asfNode);
      });

      return array;
    },

    afsStatLines(): string[] {
      const auraEffects: number[] = [];
      this.auras.forEach((aura: any) => {
        auraEffects.push(aura.aurasFromSkillsHelperArray(this.globalAuraEffect, this.supportGemsStatic))
      });

      const afsStatLines: string[] = [];
      this.afsAEArray.forEach((afs: any) => {
        const statLine = afs.getScaledStatLine(auraEffects);
        if (statLine) afsStatLines.push(afs.getScaledStatLine(auraEffects));
      });

      return afsStatLines;
    }
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
