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
      loading: false as boolean,

      auraStatic: new Map() as Map<string, Aura>,
    };
  },

  async mounted() {
    this.loading = true;
    console.log('Loading auras from RePoE...');
    await this.loadAuras();
    console.log('Done!');

    this.loading = false;
  },

  methods: {
    async loadAuras() {
      const res = await AurasServices.getAuras();
      res.forEach((aura) => {
        const id = aura.active_skill.display_name.replaceAll(' ', '').toLowerCase();
        this.auraStatic.set(id, new Aura(
          aura,
          this.$getAuraStat(aura),
          this.$getQualityStat(aura),
        ));
      });
    },
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
