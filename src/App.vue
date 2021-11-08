<template>
  <div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AurasServices from './services/AurasServices';
import Aura from './models/Aura';
import SupportGem from './models/SupportGem';
import PlayerAura from './models/PlayerAura';

export default defineComponent({
  name: 'App',
  components: {
  },

  data() {
    return {
      loading: false as boolean,

      auraStatic: new Map() as Map<string, Aura>,
      supportGemsStatic: new Map() as Map<string, SupportGem>,

      playerAuras: new Map() as Map<string, PlayerAura>,
    };
  },

  async mounted() {
    this.loading = true;
    console.log('Loading Auras from RePoE...');
    await this.loadAuras();
    console.log('Loading Support Gems from RePoE...');
    await this.loadSupportGems();
    console.log('Done!');


    AurasServices.getPassiveTree();
    this.testAura();
    this.loading = false;
  },

  methods: {
    testAura() {
      const discpline = this.playerAuras.get('discipline')!;
      discpline.level = 2;
      discpline.altQuality = 2;
      discpline.quality = 20;

      console.log(this.playerAuras.get('discipline')!.getStatLines(
        this.auraStatic.get('discipline')!,
        0,
        this.supportGemsStatic,
      ));

      console.log(this.playerAuras.get('discipline')!.getQualityStatLines(
        this.auraStatic.get('discipline')!,
        100,
        this.supportGemsStatic,
      ));
    },

    async loadAuras() {
      const res: any[] = await AurasServices.getAuras();
      res.forEach((aura) => {
        const id: string = aura.active_skill.display_name.replaceAll(' ', '').toLowerCase();
        this.auraStatic.set(id, new Aura(
          id,
          this.$getAuraStat(aura),
          this.$getQualityStat(aura),
          aura,
        ));

        this.playerAuras.set(id, new PlayerAura(id, aura.active_skill.display_name));
      });
    },

    async loadSupportGems() {
      const res: any[] = await AurasServices.getSupportGems();

      res.forEach((supportGem) => {
        const id: string = supportGem.base_item.display_name.replaceAll(' ', '').replace('Support', '').toLowerCase();
        this.supportGemsStatic.set(id, new SupportGem(id, supportGem));
      });
    }
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
