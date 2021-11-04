import Aura from './Aura';
import SupportGem from './SupportGem';

export default class PlayerAura {
  public id: string;
  public displayName: string;
  public level: number;
  public altQuality: number;
  public quality: number;
  public generosityLevel: number;
  public generosityType: number;
  public localAuraEffect: number;

  constructor(id: string, displayName: string) {
    this.id = id;
    this.displayName = displayName;

    this.level = 0;
    this.altQuality = 0;
    this.quality = 0;
    this.generosityLevel = 0;
    this.generosityType = 0;
    this.localAuraEffect = 0;
  }

  public getStatLines(aura: Aura, auraEffect: number, supportGems: Map<string, SupportGem>): string[] {
    if (this.level === 0) return [];

    const ae: number = this.auraEffectForGem(auraEffect, supportGems);
    const level = this.level;

    const stats: string[] = [];
    aura.stats.forEach((statLine, i) => {
      let line: string = statLine;

      if (aura.statsPerLevel[i].value) {
        const statValue: number = aura.statsPerLevel[i].value * (1 + (ae / 100));
        line.replace('{0}', statValue.toString());
        stats.push(line);
      } else {
        aura.statsPerLevel[i][level - 1].forEach((e: any, j: number) => {
          const statValue: number = e.value * (1 + (ae / 100));
          line = line.replaceAll(`{${j}}`, statValue.toString());
        });
      }
      stats.push(line);
    });

    return stats;
  }

  public getQualityStatLines(aura: Aura, auraEffect: number, supportGems: Map<string, SupportGem>): string[] {
    if (this.level === 0 || this.altQuality === 0 || this.quality === 0) return [];

    const ae: number = this.auraEffectForGem(auraEffect, supportGems);

    const qualityStats: string[] = [];
    aura.qualityStats.forEach((qualityLine, i) => {
      const line = qualityLine;

      // quality
    });

    return qualityStats;
  }

  private getGenerosityAuraEffect(supportGems: Map<string, SupportGem>): number {
    switch (this.generosityType) {
      case 1:
        if (this.generosityLevel > 40) this.generosityLevel = 40;
        if (this.generosityLevel <= 0) break;
        return supportGems.get('generosity')?.statsPerLevel[this.generosityLevel - 1] || 0;
      case 2:
        if (this.generosityLevel > 20) this.generosityLevel = 20;
        if (this.generosityLevel <= 0) break;
        return supportGems.get('awakenedgenerosity')?.statsPerLevel[this.generosityLevel - 1] || 0;
    }

    return 0;
  }

  private auraEffectForGem(auraEffect: number, supportGems: Map<string, SupportGem>): number {
    return this.localAuraEffect + auraEffect + this.getGenerosityAuraEffect(supportGems);
  }
}
