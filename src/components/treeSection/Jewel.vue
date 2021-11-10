<template>
  <label class="jewel-label">
    <div class="jewel">
      <img :src="img">
      <input v-if="variant === 'toggle'" v-model="jewelValue" class="me-1" type="checkbox">
      <input v-if="variant === 'number'" v-model="jewelValue" class="ms-auto" type="number" min="0" max="100" placeholder="AuraEffect" >
      {{ title }}
    </div>
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    value: {
      type: [Number, Boolean],
      require: true,
    },

    variant: {
      type: String,
      require: true,
      validator: (v: string) => ['toggle', 'number'].includes(v),
    },

    imgLink: {
      type: String,
      require: true,
    },

    title: {
      type: String,
      require: true,
    }
  },

  computed: {
    img() {
      try {
        return require(`@/assets/${this.imgLink}`);
      } catch {
        return require('@/assets/img/tree/missing.png');
      }
    },

    jewelValue: {
      get() {
        return this.value;
      },
      set(v: any) {
        this.$emit('update', v);
      }
    }
  }
});

</script>

<style lang="scss">
.jewel-label {
  padding: 0.4em;
}
.jewel {
  background-color: #111;
  border-radius: 5px;
  flex-direction: column;
  flex-wrap: nowrap;

  img {
    width: 35px;
    height: 35px;
    margin-right: 8px;
  }
}
</style>
