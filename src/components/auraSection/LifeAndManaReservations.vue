<template>
  <div class="aura">
    <div class="aura-row">
      <div class="left-group">
        <span class="aura-title">
          <img :src="lifeGlobUrl" />
          Reserved Life
        </span>
      </div>

      <div class="right-group">
        <input v-model="reservedLife" style="width: 100px" type="number" min="0" />
      </div>
    </div>

    <div class="aura-row">
      <div class="left-group">
        <span class="aura-title">
          <img :src="manaGlobUrl" />
          Reserved Mana
        </span>
      </div>

      <div class="right-group">
        <input v-model="reservedMana" style="width: 100px" type="number" min="0" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useReserverstions } from '~/composables/useAura.hooks';
import { imageUrl } from '~/composables/common.hook';
export default defineComponent({
  setup() {
    const { reservedLife, reservedMana } = useReserverstions();
    const lifeGlobUrl = imageUrl('img/globes/life.png');
    const manaGlobUrl = imageUrl('img/globes/mana.png');

    return { reservedLife, reservedMana, lifeGlobUrl, manaGlobUrl };
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
