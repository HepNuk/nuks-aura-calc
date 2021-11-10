<template>
  <div class="aura-label">
    <div class="aura">
      <div class="aura-row">
        <div class="left-group">
          <img v-if="require(`@/assets/img/auras/${playerAura.id}.png`)" :src="require(`@/assets/img/auras/${playerAura.id}.png`)">
          <span class="aura-title">
            {{ playerAura.displayName }}
          </span>
        </div>

        <div class="right-group">
          <img src="@/assets/img/gems/generosity.png">:
          <select v-model="playerAura.generosityType">
            <option :value="0">None</option>
            <option :value="1">Generosity</option>
            <option :value="2">Awakened</option>2
          </select>
          <input v-model="playerAura.generosityLevel" type="number" min="0" :max="maxGenerosityLevel" placeholder="Lvl" >
        </div>
      </div>

      <div class="aura-row">
        <div class="left-group">
          <img v-if="require(`@/assets/img/gems/${playerAura.id}.png`)" :src="require(`@/assets/img/gems/${playerAura.id}.png`)">
        </div>

        <div class="right-group">
          <span class="details">Lvl:</span>
          <input v-model="playerAura.level" type="number" min="0" max="40" placeholder="Lvl">

          <span class="details">Qual:</span>
          <input
            v-model="playerAura.quality"
            type="number"
            min="0"
            max="120"
            placeholder="Qlty"
          >

          <span class="details">Alt:</span>
          <select v-model="playerAura.altQuality">
            <option value="0">None</option>
            <option v-if="altQualityCount > 1" value="1">Anom</option>
            <option v-if="altQualityCount > 2" value="2">Diverg</option>
            <option v-if="altQualityCount > 3" value="3">Phantasm</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    playerAura: {
      type: Object,
      require: true,
    },

    altQualityCount: {
      type: Number,
      require: false,
      default: 0,
    },
  },


  computed: {
    maxGenerosityLevel(): number {
      switch (this.playerAura.generosityType) {
        case 0: return 0;
        case 1: return 40;
        case 2: return 20;
      }
    }
  },

  watch: {
    'playerAura.generosityType' : {
      handler(to) {
        if (to === 0 && this.playerAura.generosityLevel > 0) this.playerAura.generosityLevel = 0;
        else if (to === 2 && this.playerAura.generosityLevel > 20) this.playerAura.generosityLevel = 20;
      }
    },

    'playerAura.generosityLevel' : {
      handler(to) {
        if (this.playerAura.generosityType === 0) this.playerAura.generosityLevel = 0;
        else if (this.playerAura.generosityType === 1 && to > 40) this.playerAura.generosityLevel = 40;
        else if (this.playerAura.generosityType === 2 && to > 20) this.playerAura.generosityLevel = 20;
      }
    }
  }
});

</script>

<style scoped lang="scss">
.aura-label {
  padding: 0.3em;
}

.aura {
  background-color: #111;
  border-radius: 5px;
  flex-direction: column;
  flex-wrap: nowrap;

  img{
    border-radius: 5px;
    width: 35px;
    height: 35px;
    float: left;
    margin-right: 0.25rem;
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
