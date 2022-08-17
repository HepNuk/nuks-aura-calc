<template>
  <div class="aura">
    <div class="aura-row">
      <div class="left-group">
        <img :src="auraIcon" />
        <span class="aura-title">
          {{ aura.displayName }}
        </span>
      </div>

      <div class="right-group">
        <img :src="generosityGem" />
        <select v-model="aura.generosityType">
          <option :value="0">None</option>
          <option :value="1">Generosity</option>
          <option :value="2">Awakened</option>
        </select>
        <input
          v-model="aura.generosityLevel"
          type="number"
          min="0"
          :max="maxGenerosityLevel"
          placeholder="Lvl"
        />
      </div>
    </div>

    <div class="aura-row">
      <div class="left-group">
        <img :src="gemIcon" />
      </div>

      <div class="right-group">
        <span class="details">AE</span>
        <input v-model="aura.localAuraEffect" type="number" min="0" max="100" placeholder="AE" />

        <span class="details">Lvl</span>
        <input v-model="aura.level" type="number" min="0" max="40" placeholder="Lvl" />

        <span class="details">Qual</span>
        <input v-model="aura.quality" type="number" min="0" max="120" placeholder="Qlty" />

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
import { defineComponent, computed, watch } from 'vue';
import { useAura, useAuraIcons } from '~/composables/useAura.hooks';
import { imageUrl } from '~/composables/common.hook';

export default defineComponent({
  props: {
    auraId: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const { aura } = useAura(props.auraId);

    const maxGenerosityLevel = computed(() => {
      switch (aura.value.generosityType) {
        case 1:
          return 40;
        case 2:
          return 20;
        default:
          return 0;
      }
    });

    watch(
      () => aura.value.generosityType,
      (to) => {
        if (to === 0 && aura.value.generosityLevel > 0) {
          aura.value.generosityLevel = 0;
        } else if (to === 2 && aura.value.generosityLevel > 20) {
          aura.value.generosityLevel = 20;
        }
      }
    );

    watch(
      () => aura.value.generosityLevel,
      (to) => {
        if (to === 0 && aura.value.generosityLevel > 0) {
          aura.value.generosityLevel = 0;
        } else if (to === 2 && aura.value.generosityLevel > 20) {
          aura.value.generosityLevel = 20;
        }
      }
    );

    const { auraIcon, gemIcon } = useAuraIcons(aura.value.id);
    const altQualityCount = computed(() => aura.value.auraDetails.qualityStats.length);
    const generosityGem = imageUrl('img/gems/generosity.png');

    return {
      imageUrl,
      aura,
      maxGenerosityLevel,
      auraIcon,
      gemIcon,
      altQualityCount,
      generosityGem,
    };
  },
});
</script>

<style scoped lang="scss">
.aura {
  flex-direction: column;
  flex-wrap: nowrap;

  img {
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
