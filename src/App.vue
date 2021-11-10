<template>
  <div class="aura-app mb-2">
    <Header title="Nuk's PoE Aura stats calculator | WIP" version="3.16"/>
  </div>

  <div class="d-flex">
    <div class="flex-grow-1 me-3">
      <template v-if="!loading">
        <AuraSection v-if="playerAuras.size > 0" class="content-box" :player-auras="playerAuras" :aura-static="auraStatic"/>
        <TreeSection v-if="passiveTree.treeClusters.size > 0" class="content-box" :passive-tree="passiveTree" />
      </template>
    </div>

    <div class="justify-content-center">
      <div class="output-stats sticky-top">
        
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import AurasServices from './services/AurasServices';
import Aura from './models/Aura';
import SupportGem from './models/SupportGem';
import PlayerAura from './models/PlayerAura';
import Tree from './models/Tree';
import Ascendancy from './models/Ascendancy';

import Header from './components/shared/Header.vue';
import AuraSection from './components/auraSection/AuraSection.vue';
import TreeSection from './components/treeSection/TreeSection.vue';

export default defineComponent({
  name: 'App',
  components: {
    Header,
    AuraSection,
    TreeSection,
  },

  data() {
    return {
      loading: false as boolean,

      auraStatic: new Map() as Map<string, Aura>,
      supportGemsStatic: new Map() as Map<string, SupportGem>,
      passiveTree: new Tree(),
      ascendancies: new Ascendancy(),

      playerAuras: new Map() as Map<string, PlayerAura>,
    };
  },

  computed: {
    globalAuraEffect(): number {
      return this.passiveTree.getAuraEffect() + this.ascendancies.getAuraEffect();
    },
  },

  async mounted() {
    this.loading = true;
    console.log('Loading Auras from RePoE...');
    await this.loadAuras();

    console.log('Loading Support Gems from RePoE...');
    await this.loadSupportGems();

    console.log('Loading Tree Data from GGG...');
    await this.loadTreeData();

    console.log('Done!');

    // this.testAura();
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
      this.ascendancies.ascendancy = 'necromancer';
      console.log(this.passiveTree);
      console.log(this.ascendancies);
      console.log(this.ascendancies.getAuraEffect());
    },

    async loadAuras() {
      const res: any[] = await AurasServices.getAuras();

      // Sort alphbetically
      res.sort((a, b) => {
        if (a.active_skill.display_name < b.active_skill.display_name) return -1;
        return 1;
      });

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
    },

    async loadTreeData() {
      const res: any = await AurasServices.getPassiveTreeNodes();
      res.nodes.forEach((node: any) => {
        this.passiveTree.addNewNode(node);
      });

      res.ascNodes.forEach((ascNodes: any) => {
        this.ascendancies.addNewNode(ascNodes);
      });
    },

  },
});
</script>

<style lang="scss">
@import '@/assets/css/styles.scss';
.sticky-top { top: 0.5em; }
</style>
