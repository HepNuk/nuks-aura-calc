<template>
  <div class="aura">
    <div class="aura-row">
      <div class="left-group">
        <img :src="auraIcon">
        <span class="aura-title">
          {{ aura.displayName }}
        </span>
      </div>

      <div class="right-group">
        <img src="@/assets/img/gems/generosity.png">
        <select v-model="aura.generosityType">
          <option :value="0">None</option>
          <option :value="1">Generosity</option>
          <option :value="2">Awakened</option>2
        </select>
        <input v-model="aura.generosityLevel" type="number" min="0" :max="maxGenerosityLevel" placeholder="Lvl" >
      </div>
    </div>

    <div class="aura-row">
      <div class="left-group">
        <img :src="gemIcon">
      </div>

      <div class="right-group">
        <span class="details">AE</span>
        <input v-model="aura.localAuraEffect" type="number" min="0" max="100" placeholder="AE">

        <span class="details">Lvl</span>
        <input v-model="aura.level" type="number" min="0" max="40" placeholder="Lvl">

        <span class="details">Qual</span>
        <input
          v-model="aura.quality"
          type="number"
          min="0"
          max="120"
          placeholder="Qlty"
        >

        <span class="details">Alt:</span>
        <select v-model="aura.altQuality" style="width: 75px">
          <option value="0">None</option>
          <option v-if="altQualityCount > 1" value="1">Anom</option>
          <option v-if="altQualityCount > 2" value="2">Diverg</option>
          <option v-if="altQualityCount > 3" value="3">Phantasm</option>
        </select>
      </div>
    </div>
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
  },


  computed: {
    maxGenerosityLevel(): number {
      switch (this.aura.generosityType) {
        case 0: return 0;
        case 1: return 40;
        case 2: return 20;
      }
    },

    auraIcon(): string {
      try { return require(`@/assets/img/auras/${this.aura.id}.png`); }
      catch { return require('@/assets/img/auras/missing.png'); }
    },

    gemIcon(): string {
      try { return require(`@/assets/img/gems/${this.aura.id}.png`); }
      catch { return require('@/assets/img/gems/missing.png'); }
    },

    altQualityCount(): number {
      return this.aura.auraDetails.qualityStats.length;
    }
  },

  watch: {
    'aura.generosityType' : {
      handler(to) {
        if (to === 0 && this.aura.generosityLevel > 0) this.aura.generosityLevel = 0;
        else if (to === 2 && this.aura.generosityLevel > 20) this.aura.generosityLevel = 20;
      }
    },

    'aura.generosityLevel' : {
      handler(to) {
        if (this.aura.generosityType === 0) this.aura.generosityLevel = 0;
        else if (this.aura.generosityType === 1 && to > 40) this.aura.generosityLevel = 40;
        else if (this.aura.generosityType === 2 && to > 20) this.aura.generosityLevel = 20;
      }
    }
  }
});

</script>

<style scoped lang="scss">
.aura {
  flex-direction: column;
  flex-wrap: nowrap;

  img{
    border-radius: 5px;
    width: 35px;
    height: 35px;
    // float: left;
    margin-right: 0.25rem;
  }
  .details {
    margin-right: 0.15rem;
  }

  .aura-row {
    display: flex;
    justify-content: space-between;
    height: 35px;

    .left-group {
      display: flex;
      align-items: center;
      .aura-title {
        min-width: 120px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }

    .right-group {
      display: flex;
      align-items: center;
    }
  }
}
</style>
