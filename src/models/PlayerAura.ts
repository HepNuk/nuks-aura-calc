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
        if (statValue < 0) line = this.handleNegativeValues(0, line);
        line = line.replace('{0}', Math.abs(statValue).toString());

      } else {
        aura.statsPerLevel[i][level - 1].forEach((e: any, j: number) => {
          const statValue: number = e.value * (1 + (ae / 100));
          if (statValue < 0) line = this.handleNegativeValues(i, line);
          line = line.replace(`{${j}}`, Math.abs(statValue).toString());
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
    const aQual = this.altQuality;
    aura.qualityStats[aQual].forEach((qualityLine, i) => {
      const statValue: number = (aura.statsPerQuality[aQual][i] / 100) * (1 + (ae / 100));
      let line = qualityLine;
      if (statValue < 0) line = this.handleNegativeValues(0, qualityLine);

      qualityStats.push(line.replace('{0}', Math.abs(statValue).toString()));
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

  private handleNegativeValues(statIndex: number, line: string): string {
    const index = line.indexOf(`{${statIndex}}`);
    if (index < 0) return line;

    if (line.slice(index, index + 'faster'.length + 5).includes('faster')) {
      const secondIndex: number = index + 'faster'.length + 5;
      return line.slice(0, index)
        + line.slice(index, secondIndex).replace('faster', 'slower')
        + line.slice(secondIndex);

    } else if (line.slice(index, index + 'increased'.length + 5).includes('increased')) {
      const secondIndex: number = index + 'increased'.length + 5;

      return line.slice(0, index)
        + line.slice(index, secondIndex).replace('increased', 'decreased')
        + line.slice(secondIndex);

    } else if (line.slice(index, index + 'more'.length + 5).includes('more')) {
      const secondIndex: number = index + 'more'.length + 5;
      return line.slice(0, index)
        + line.slice(index).replace('more', 'less')
        + line.slice(secondIndex);
    }

    return line;
  }
}