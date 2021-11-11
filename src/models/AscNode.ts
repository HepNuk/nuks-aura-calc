import AbsrtactNode from './AbstractNode';

const STAT_REGEX = {
  auraEffect: /(\d*)% increased effect of Non-Curse Auras from your Skills/,
  aurasFromSkill: /Auras from your Skills grant \+?([0-9.]*)% [a-zA-Z ]*you and Allies/,
  takeIncreasedDamage: /take (\d*)% increased Damage/,
  grantsXOfReservation: /Grants [a-zA-Z ]*(\d*)% of your [a-zA-z ]* and nearby Allies/,
  youAndNearbyAllies: /(?:N|n)earby Allies (?:deal|have) \+?(\d*)% [a-zA-Z ,]*/,
  nearbyAlliesSpecial: /Nearby Allies ([a-zA-Z]*) Enemies for 4 seconds on Hit/
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
        this.setupTakeIncreasedDamage(stat);

      } else if (STAT_REGEX.grantsXOfReservation.test(stat)) {
        this.setupGrantsXOfReservation(stat);

      } else if (STAT_REGEX.youAndNearbyAllies.test(stat)) {
        this.setupYouAndNearbyAllies(stat);

      } else if (STAT_REGEX.nearbyAlliesSpecial.test(stat)) {
        this.setupNearbyAlliesSpecial(stat);
      }
    });
  }

  private parseValue(regexMatch: string[]) {
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

  private setupTakeIncreasedDamage(stat: string) {
    this.setBooleans(false, false);

    const value = this.parseValue(stat.match(STAT_REGEX.takeIncreasedDamage));
    this.values.push(value);
    this.statTexts.push(`Enemies take ${value}% increased Damage`);
  }

  private setupGrantsXOfReservation(stat: string) {
    const reservationType = stat.match(/(Life|Mana)/)[1];
    const scalingStat = stat.match(/(Armour|maximum Energy Shield)/)[1];
    this.setBooleans(false, false, reservationType);
    const value = this.parseValue(stat.match(STAT_REGEX.grantsXOfReservation));
    this.values.push(value);
    this.statTexts.push(`+{0} to ${scalingStat}`);
  }

  private setupYouAndNearbyAllies(stat: string) {
    this.setBooleans(false, false);
    const regex = stat.match(/\+?\d*%[a-zA-Z ,]*/);
    const value = this.parseValue(stat.match(STAT_REGEX.youAndNearbyAllies));
    this.values.push(value);
    this.statTexts.push(regex[0]);
  }

  private setupNearbyAlliesSpecial(stat: string) {
    this.setBooleans();
    const regex = stat.match(STAT_REGEX.nearbyAlliesSpecial);
    this.values.push(0);
    this.statTexts.push(`Nearby Enemies are ${regex[1]}`);
  }
}