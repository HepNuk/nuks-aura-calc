<template>
  <div class="aura-label">
    <div class="aura">
      <div class="top">
        <img :src="require(`@/assets/img/aura/${playerAura.id}.png`)">
        a
      </div>

      <div class="bottom">
        <img :src="require(`@/assets/img/aura/${playerAura.id}.png`)">
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
    }
  },

  mounted() {
    console.log(this.playerAura);
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
  }

  .top {
    height: 35px;
  }

  .bottom {
    height: 35px;
  }
}
</style>
