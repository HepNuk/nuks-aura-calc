import { newLineWithIndentation } from 'tslint/lib/utils';
import AbsrtactNode from './AbstractNode';

const STAT_REGEX = {
  auraEffect: /(\d*)% increased effect of Non-Curse Auras from your Skills/,
  aurasFromSkill: /Auras from your Skills grant \+?([0-9.]*)% [a-zA-Z ]*you and Allies/,
  takeIncreasedDamage: /take (\d*)% increased Damage/,
  grantsXOfReservation: /Grants [a-zA-Z ]*(\d*)% of your [a-zA-z ]* and nearby Allies/,
  youAndNearbyAllies: /(?:Y|y)ou and nearby Allies (?:deal|have) \+?(\d*)% [a-zA-Z ]*/
};

export default class AscNode extends AbsrtactNode {

  public untranslatedStats: string[];
  public statTexts: string[];
  public values: number[];

  public isAurasFromSkill: boolean[];
  public isAuraEffect: boolean[];
  public scalesWithReservation: string[];

  constructor(ascNode: any) {
    super(ascNode);

    this.untranslatedStats = [];
    this.statTexts = [];
    this.values = [];

    this.isAurasFromSkill = [];
    this.isAuraEffect = [];
    this.scalesWithReservation = [];

    this.loadStats(ascNode.stats);
  }

  public toggleActive() { this.active = !this.active; }

  private loadStats(stats: string[]) {
    let value: any = 0;
    stats.some((stat, i) => {
      stat = stat.replace('\n', ' ');
      this.untranslatedStats.push(stat);

      if (STAT_REGEX.auraEffect.test(stat)) {
        this.setupAuraEffect(stat);
      } else if (STAT_REGEX.aurasFromSkill.test(stat)) {
        this.setupAurasFromSkill(stat);
      } else if (STAT_REGEX.takeIncreasedDamage.test(stat)) {

        this.setBooleans(false, false, );

        value = this.parseValue(stat.match(STAT_REGEX.takeIncreasedDamage));

      } else if (STAT_REGEX.grantsXOfReservation.test(stat)) {
        const reservationType = stat.match(/(Life|Mana)/)[1];
        this.setBooleans(false, false, reservationType);
        value = this.parseValue(stat.match(STAT_REGEX.grantsXOfReservation));

      } else if (STAT_REGEX.youAndNearbyAllies.test(stat)) {
        this.setBooleans(false, false);

        value = this.parseValue(stat.match(STAT_REGEX.youAndNearbyAllies));

      }
    });

    // console.log(this)
  }

  private parseValue(regexMatch: string[]) {
    // console.log(regexMatch)
    return parseFloat(regexMatch[1]);
  }

  private setBooleans(isAurasFromSkill: boolean = false, isAuraEffect: boolean = false, scalesWithReservation: string = null): void {
    this.isAurasFromSkill.push(isAurasFromSkill);
    this.isAuraEffect.push(isAuraEffect);
    this.scalesWithReservation.push(scalesWithReservation)
  }

  private setupAuraEffect(stat: string) {
    this.setBooleans(false, true);

    this.values.push(this.parseValue(stat.match(STAT_REGEX.auraEffect)));
    this.statTexts.push(stat);
  } 

  private setupAurasFromSkill(stat: string) {
    this.setBooleans(true);
    this.values.push(this.parseValue(stat.match(STAT_REGEX.aurasFromSkill)));
    const regex = stat.match(/Auras from your Skills grant (\+?)(?:[0-9.]*)*([a-zA-Z %]*) to you and Allies/);
    this.statTexts.push(regex[1] + '{0}' + regex[2]);
  }
}