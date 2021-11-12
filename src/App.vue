<template>
  <div class="aura-app">
    <Header class="mb-2" title="Nuk's PoE Aura stats calculator | Version : 0.1.0 (Beta)" version="3.16"/>

    <Spinner v-if="loading"/>
    <div v-else-if="!loading" class="d-flex">
      <div class="flex-grow-1 me-2">
        <AuraSection 
          v-if="auras.size > 0"
          class="content-box" 
          v-bind="{ auras, reservedValues }"
        />

        <TreeSection 
          v-if="passiveTree.treeClusters.size > 0"
          class="content-box"
          :passive-tree="passiveTree" 
        />

        <AscendancySection 
          v-if="ascendancies.ascendancyTrees.size > 0"
          class="content-box"
          :ascendancies="ascendancies"
        />
      </div>

      <div class="justify-content-center">
        <OutputSection 
          class="output-stats sticky"
          v-bind="{
            globalAuraEffect,
            auras,
            ascendancies,
            passiveTree,
            supportGemsStatic,
            reservedValues,
          }"
        />
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

import Spinner from '@/components/shared/Spinner.vue';
import Header from './components/shared/Header.vue';
import AuraSection from './components/auraSection/AuraSection.vue';
import TreeSection from './components/treeSection/TreeSection.vue';
import AscendancySection from './components/asendancySection/AscendancySection.vue';
import OutputSection from './components/outputSection/OutputSection.vue';


export default defineComponent({
  name: 'App',
  components: {
    Header,
    Spinner,
    AuraSection,
    TreeSection,
    AscendancySection,
    OutputSection,
  },

  data() {
    return {
      loading: false as boolean,

      auras: new Map() as Map<string, PlayerAura>,
      supportGemsStatic: new Map() as Map<string, SupportGem>,
      passiveTree: new Tree(),
      ascendancies: new Ascendancy(),

      reservedValues: new Proxy({ life: 0, mana: 0 }, {})
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
    this.loading = false;
  },

  methods: {
    async loadAuras() {
      const res: any[] = await AurasServices.getAuras();

      // Sort alphbetically
      res.sort((a, b) => {
        if (a.active_skill.display_name < b.active_skill.display_name) return -1;
        return 1;
      });

      res.forEach((aura) => {
        const id: string = aura.active_skill.display_name.replaceAll(' ', '').toLowerCase();

        const auraDetail = new Aura(
          id,
          this.$getAuraStat(aura),
          this.$getQualityStat(aura),
          aura,
        );

        this.auras.set(id, new PlayerAura(id, auraDetail));
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
.sticky{ 
  top: 0.5em; 
  position: sticky;
}
</style>
