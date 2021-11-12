<template>
  <BaseModal>
    <template v-slot:button="{ showModal }">
      <a class="btn btn-light mx-1" @click="showModal">
        Known Issues
      </a>
    </template>
    
    <template v-slot:modal>
      <h3 class="p-1 mb-0">
        Known Issues:
      </h3>
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
  mounted() {
    console.log(issues)
  }
});

</script>

<style scoped lang="scss">
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
