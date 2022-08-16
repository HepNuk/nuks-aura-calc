import AscNode from './AscNode';
import AFSstat from './AFSstat';
import ReservationBasedStat from './ReservationBasedStat';

export default class Ascendancy {

  public ascendancy: string;
  public ascendancyTrees: Map<string, AscNode[]>;

  constructor() {
    this.ascendancyTrees = new Map<string, AscNode[]>();
    this.ascendancy = null;
  }

  public addNewNode(ascNodes: any) {
    const ascendancy: string = ascNodes.ascendancyName.toLowerCase();
    const treeNode = new AscNode(ascNodes);

    if (this.ascendancyTrees.has(ascendancy)) {
      this.ascendancyTrees.get(ascendancy).push(treeNode);
    } else {
      this.ascendancyTrees.set(ascendancy, [treeNode]);
    }
  }

  public getAuraEffect(): number {
    let ae = 0;
    this.forEachNode((ascNode) => {
      if (ascNode.active) {
        ascNode.isAuraEffect.forEach((e, i) => {
          if (e) ae += ascNode.values[i];
        });
      }
    });

    return ae;
  }

  public forEachNode(callback: (node: AscNode) => void) {
    if (!this.ascendancy) return;

    const ascNodes = this.ascendancyTrees.get(this.ascendancy);
    ascNodes.forEach((ascNode) => {
      callback(ascNode);
    });
  }

  public forEachAFSStat(callback: (stat: AFSstat) => void) {
    this.forEachNode((ascNode) => {
      if (ascNode.active) {
        ascNode.isAurasFromSkill.forEach((e, i) => {
          if (e) callback(new AFSstat(ascNode.statTexts[i], ascNode.values[i]));
        });
      }
    });
  }

  public forEachReservationBasedStat(callback: (stat: ReservationBasedStat) => void) {
    this.forEachNode((ascNode) => {
      if (ascNode.active) {
        ascNode.statTexts.forEach((e, i) => {
          if (ascNode.scalesWithReservation[i]) {
            callback(new ReservationBasedStat(e, ascNode.values[i], ascNode.scalesWithReservation[i]));
          }
        });
      }
    });
  }

  public forEachMiscStat(callback: (stat: string) => void) {
    this.forEachNode((ascNode) => {
      if (ascNode.active) {
        ascNode.statTexts.forEach((e, i) => {
          if (!ascNode.isAuraEffect[i] && !ascNode.isAurasFromSkill[i] && !ascNode.scalesWithReservation[i]) {
            callback(e);
          }
        });
      }
    });
  }

  public selectAscendancy(ascendancy: string) {
    if (this.ascendancy === ascendancy) return;
    if (this.ascendancyTrees.has(ascendancy)) {
      this.ascendancy = ascendancy;
    }
  }
}
