<template>
  <div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AurasServices from './services/AurasServices';
import Aura from './models/Aura';

export default defineComponent({
  name: 'App',
  components: {
  },

  data() {
    return {
      auraList: [] as Aura[],
      auraSkillTranslations: null as any,
    };
  },

  async mounted() {
    AurasServices.getAuras().then((res: any[]) => {
      res.forEach((aura) => {
        this.auraList.push(new Aura(
          aura,
          this.$t.getAuraStat(aura),
        ));
      });
    });
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
