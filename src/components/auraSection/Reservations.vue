<template>
  <div class="aura">
    <div class="aura-row">
      <div class="left-group">
        <span class="aura-title">
          <img src="@/assets/img/globes/life.png">
          Reserved Life
        </span>
      </div>

      <div class="right-group">
        <input v-model="reservedValues.life" style="width: 100px" type="number" min="0" placeholder="Reserved Life" >
      </div>
    </div>

    <div class="aura-row">
      <div class="left-group">
        <span class="aura-title">
          <img src="@/assets/img/globes/mana.png">
          Reserved Manaas
        </span>
      </div>

      <div class="right-group">
        <input v-model="reservedValues.mana" style="width: 100px" type="number" min="0" placeholder="Reserved Mana" >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    reservedValues: {
      type: Object,
      require: true,
    },
  },
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
