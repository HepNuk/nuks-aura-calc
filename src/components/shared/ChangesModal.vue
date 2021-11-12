<template>
  <BaseModal>
    <template v-slot:button="{ showModal }">
      <a class="btn btn-light mx-1" @click="showModal">
        Change History
      </a>
    </template>
    
    <template v-slot:modal="{ closeModal }">
      <div class="d-flex justify-content-between">
        <h3 class="p-1 mb-0">
          Change History
        </h3>
        <a class="close-button align-self-center me-2" @click="closeModal">
          <fa :icon="['fa', 'times-circle']" color="#FFF"/>
        </a>
      </div>
      <hr class="mb-0 mt-1">

      <div class="changes-box mt-2">
        <div v-for="(change, i) in changes" :key="'change-'+ i" class="mb-2">
          <h6 class="version-title">
            <span>{{ change.date }}</span> | Version: {{ change.version.join('.') }} - {{ change.title }}
          </h6>

          <!-- FIXES -->
          <template v-if="change.fixes.length > 0">
            <div class="ms-5">
              <li>
                Fixes:
              </li>

              <p v-for="(fix, i) in change.fixes" :key="change.version.join('') + '-' + i">
                - {{ fix }}
              </p> 
            </div>
          </template>

          <!-- CHANGES -->
          <template v-if="change.changes.length > 0">
            <div class="ms-5">
              <li>
                Changes:
              </li>

              <p v-for="(ch, i) in change.changes" :key="change.version.join('') + '-' + i">
                - {{ ch }}
              </p> 
            </div>
          </template>

          <!-- ADDED -->
          <template v-if="change.added.length > 0">
            <div class="ms-5">
              <li>
                Added:
              </li>

              <p v-for="(add, i) in change.fixes" :key="change.version.join('') + '-' + i">
                - {{ add }}
              </p> 
            </div>
          </template>

          <!-- REMOVED -->
          <template v-if="change.removed.length > 0">
            <div class="ms-5">
              <li>
                Removed:
              </li>

              <p v-for="(rem, i) in change.fixes" :key="change.version.join('') + '-' + i">
                - {{ rem }}
              </p> 
            </div>
          </template>


          <hr v-if="i+1 < changes.length">
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseModal from '@/components/shared/BaseModal.vue';
import changes from '@/assets/informationJsons/changes.json';

export default defineComponent({
  components: {
    BaseModal,
  },

  data() {
    return {
      changes,
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
.changes-box {
  max-height: 820px;
  overflow-y: auto;
  .version-title {
    margin-left: 0.4em;
    font-size: 22px;
    span {
    color:rgb(141, 173, 219);
    }
  }

  li {
    font-size: 18px;
  }

  p {
    font-size: 16px;
    margin-left: 1.2em;
    color:rgb(150, 175, 211);
  }

  .fixed {
    text-decoration: line-through;
  }
}
</style>
