<template>
  <BaseModal>
    <template v-slot:button="{ showModal }">
      <a class="btn btn-light mx-1" @click="showModal">
        Known Issues
      </a>
    </template>
    
    <template v-slot:modal="{ closeModal }">
      <div class="d-flex justify-content-between">
        <h3 class="p-1 mb-0">
          Known Issues
        </h3>
        <a class="close-button align-self-center me-2" @click="closeModal">
          <fa :icon="['fa', 'times-circle']" color="#FFF"/>
        </a>
      </div>
      <hr class="mb-0 mt-1">

      <div class="issue-box mt-2">
        <div v-for="(issue, i) in issues" :key="'issue-'+ i" class="mb-2">
          <li :class="issue.fixed ? 'fixed' : ''">{{ issue.title }}</li>
          <p v-if="issue.desc" :class="issue.fixed ? 'fixed' : ''" >{{issue.desc}}</p> 
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseModal from '@/components/shared/BaseModal.vue';
import issues from '@/assets/informationJsons/knownissues.json';

export default defineComponent({
  components: {
    BaseModal,
  },

  data() {
    return {
      issues,
    };
  },
});

</script>

<style scoped lang="scss">
.close-button  {
  font-size: 25px;
}
.close-button:hover {
  cursor: pointer;
}
.issue-box {
  max-height: 820px;
  overflow-y: auto;
  li {
    margin-left: 1em;
    font-size: 18px;
  }
  p {
    font-size: 16px;
    margin-left: 1.2em;
    color:rgb(141, 173, 219);
  }

  .fixed {
    text-decoration: line-through;
  }
}
</style>
