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
      nV = Math.floor(nV);

      scaledValue += nV;
    });
    if (scaledValue > 0) return this.line.replace('{0}', scaledValue.toString());
    return null;
  }
}
