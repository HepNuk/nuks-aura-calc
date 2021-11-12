export default class AFSstat {
  public line: string;
  public value: number;

  constructor(line: string, value: any) {
    this.line = line;
    this.value = value;
  }

  public getScaledStatLine(aurasAuraEffects: number[]) {
    let scaledValue = 0;
    const v = this.value;
    aurasAuraEffects.forEach((ae) => {
      if (ae < 0) return;
      let nV = v * (1 + (ae / 100.0));

      if (this.isIntegere()) nV = Math.floor(nV);
      else {
        nV = this.roundTo(nV, 2);
      }
      scaledValue += nV;
    });
    if (scaledValue > 0) return this.line.replace('{0}', scaledValue.toString());
    return null;
  }

  private roundTo(num: number, to: number) {
    const m = (to <= 0) ? 1 : 10**to;
    return Math.floor(num * m)/m;
  }

  private isIntegere(): boolean {
    return !(/% Regenerate|% of Life Regenerated/.test(this.line));
  }
}
