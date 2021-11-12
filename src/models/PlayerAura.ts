import Aura from './Aura';
import SupportGem from './SupportGem';

const STAT_REGEX = [
  /You and nearby (?:A|a)llies (?:have |gain |deal |are )?([a-zA-Z0-9{ }%]*)/
];

const FILTER = {
  youAndNearby: /You and (?:N|n)earby (?:A|a)llies/,
  nearbyEnemies: /(:?N|n)earby (?:E|e)nemies (?:have|take)/,
}

export default class PlayerAura {
  public id: string;
  public displayName: string;
  public auraDetails: Aura;

  public level: number;
  public altQuality: number;
  public quality: number;
  public generosityLevel: number;
  public generosityType: number;
  public localAuraEffect: number;

  constructor(id: string, aura: Aura) {
    this.id = id;
    this.displayName = aura.displayName;
    this.auraDetails = aura;

    this.level = 0;
    this.altQuality = 0;
    this.quality = 0;
    this.generosityLevel = 0;
    this.generosityType = 0;
    this.localAuraEffect = 0;
  }

  public getStatLines(auraEffect: number, supportGems: Map<string, SupportGem>): string[] {
    if (this.level === 0) return [];

    const ae: number = this.auraEffectForGem(auraEffect, supportGems);
    const level = this.level;

    const stats: string[] = [];
    this.auraDetails.stats.forEach((statLine, i) => {
      let line: string = statLine;
      if (FILTER.youAndNearby.test(line) || FILTER.nearbyEnemies.test(line)) {
        if (this.auraDetails.statsPerLevel[i].value) {
          const isIntegere = !(/% Regenerate/.test(line));
          const statValue: number = this.scaleStatWithAuraEffect(this.auraDetails.statsPerLevel[i].value, ae, isIntegere);

          line = this.youAndNearbyAlliesStatLine(line, statValue, i);

        } else {
          this.auraDetails.statsPerLevel[i][level - 1].forEach((e: any, j: number) => {
            const isIntegere = !(/% Regenerate/.test(line));
            const statValue: number = this.scaleStatWithAuraEffect(e.value, ae, isIntegere);

            line = this.youAndNearbyAlliesStatLine(line, statValue, i, j);

          });
        }
        stats.push(line);
      }
    });

    return stats;
  }

  public getQualityStatLines(auraEffect: number, supportGems: Map<string, SupportGem>): string[] {
    if (this.level === 0 || this.altQuality === 0 || this.quality === 0) return [];

    const ae: number = this.auraEffectForGem(auraEffect, supportGems);
    const qualityStats: string[] = [];
    const aQual = this.altQuality;

    this.auraDetails.qualityStats[aQual].forEach((qualityLine, i) => {
      if (FILTER.youAndNearby.test(qualityLine) || FILTER.nearbyEnemies.test(qualityLine)) {
        const isIntegere = !(/% Regenerate/.test(qualityLine));
        const statValue: number = this.scaleStatWithAuraEffect(this.auraDetails.statsPerQuality[aQual][i], ae, isIntegere, this.quality);
        const line = this.youAndNearbyAlliesQualityLine(qualityLine, statValue, i, aQual);

        if (line) qualityStats.push(line);
      }
    });
    return qualityStats;
  }

  // Private

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

  public auraEffectForGem(auraEffect: number, supportGems: Map<string, SupportGem>): number {
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

  private filterYouAndNearbyAllies(line: string): string {
    const filtered = line.match(STAT_REGEX[0]);

    if (filtered) {
      if (filtered[1].includes('to Accuracy Rating')) return filtered[1].replace('to', 'additional'); // Fix for precision.
      return filtered[1];
    }
    return line;
  }

  private youAndNearbyAlliesStatLine(statLine: string, statValue: number, i: number, j: number = 0): string{
    if (statValue < 0) statLine = this.handleNegativeValues(i, statLine);
    statLine = this.filterYouAndNearbyAllies(statLine);
    statValue = Math.abs(statValue);
    statLine = statLine.replace(`{${j}}`, (statValue).toString());
    if (statValue > 0) return statLine.replace('{j}', (statValue).toString());
    return null;
  }

  private youAndNearbyAlliesQualityLine(qualityLine: string, statValue: number, i: number, aQual: number = null): string{
    let line = this.filterYouAndNearbyAllies(qualityLine);
    if (statValue < 0) line = this.handleNegativeValues(0, line);
    statValue =  Math.abs(statValue);
    if (statValue > 0) return line.replace('{0}', (statValue).toString());
    return null;
  }

  private scaleStatWithAuraEffect(statValue: number, ae: number, integere: boolean, quality: number = null) {
    // Quality Values are stored as Integers, we have to divide by 1000 to get their true value per 1% quality
    if (quality) statValue = statValue / 1000.0;

    // Auraeffect formula
    const auraMultiploer = (1 + (ae / 100.0));
    const value = statValue * auraMultiploer * (quality ? quality : 1);

    if (integere) return Math.floor(value);
    return this.roundTo(value, 2);
  }

  private roundTo(num: number, to: number) {
    const m = (to <= 0) ? 1 : 10**to;
    return Math.floor(num * m)/m;
  }
}
