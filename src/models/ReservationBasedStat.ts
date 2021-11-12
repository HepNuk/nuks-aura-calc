export default class ReservationBasedStat {
  public line: string;
  public value: number;
  public scalesWith: string;

  constructor(line: string, value: any, scalesWith: string) {
    this.line = line;
    this.value = value;
    this.scalesWith = scalesWith;
  }

  public getScaledStatLine(reservedLife: number, reservedMana: number): string {
    const scaleMultiplier = this.value / 100.0;
    let scaledValue = 0;
    switch (this.scalesWith) {
      case 'Life':
        scaledValue = Math.floor(reservedLife * scaleMultiplier);
        break;
      case 'Mana':
        scaledValue = Math.floor(reservedMana * scaleMultiplier);
        break;
    }

    if (scaledValue > 0) return this.line.replace('{0}', String(scaledValue));
    return null;
  }
}
