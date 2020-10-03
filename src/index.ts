"use strict";

import InstitutionSendPayment from "./institutionSendPayment";
import { writeFileSync } from "fs";
import Tools from "./tools";
import SendPaymentsRecord from "./sendPaymentRecord";

class MasaVSendPayments {
  _intitutions: InstitutionSendPayment[] = [];

  addInstitution(intitution: InstitutionSendPayment) {
    this._intitutions = [...this._intitutions, intitution];
  }

  addInstitutions(intitutions: InstitutionSendPayment[]) {
    this._intitutions = [...this._intitutions, ...intitutions];
  }

  toBuffer() {
    if (this._intitutions.length === 0)
      throw new Error("There are no institutions");
    let buffer: Buffer = Buffer.concat([
      ...this._intitutions.map((institution) => institution.getBuffer()),
      Tools.getEndOfFileRecord(),
    ]);
    return buffer;
  }

  saveFile(path: string) {
    writeFileSync(path, this.toBuffer());
  }
}

export {
  InstitutionSendPayment,
  MasaVSendPayments,
  Tools,
  SendPaymentsRecord,
};
