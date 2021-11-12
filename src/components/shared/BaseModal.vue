<template>
  <slot name="button" :showModal="showModal"/>
  <!-- If the option changed modal component the name
  <MyModal>
  -->
  <Modal
    v-model="isShow"
    :close="closeModal"
  >
    <div class="modal-style">
      <div class="modal-box">
        <slot name="modal"/>
      </div>
    </div>
  </Modal>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup () {
    const isShow = ref(false);

    function showModal () {
      isShow.value = true;
    }

    function closeModal () {
      isShow.value = false;
    }

    return {
      isShow,
      showModal,
      closeModal
    };
  }
});
</script>

<style scoped lang="scss">
@import '@/assets/css/vars.scss';

.modal-style {
  font-family: itemFont;
  src: url(~@/assets/fonts/Fontin-Bold.ttf);

  display: flex;
  padding: 0.6em;
  border-radius: 6px;
  width: 75%;
  box-sizing: border-box;
  box-shadow:inset 0px 0px 0px 2px $border;
  background-color: $lAccent;
  font-size: 20px;
  z-index: 90;
  align-items: stretch;

  .modal-box {
    flex-grow: 1;
    padding: 0.3em;
    border-radius: 6px;
    background-color: $dAccent;
    color: #FFF;
    z-index: 90;
  }
}
</style>