"use strict";

/** Model class for functions that perform different operations */
class Model {
  static BTN_TYPE = {
    CLEAN: "clean",
    SIGN_CHANGE: "sign-change",
    PERCENT: "percent",
    DIVISION: "division",
    SEVEN: "seven",
    EIGHT: "eight",
    NINE: "nine",
    MULT: "mult",
    FOUR: "four",
    FIVE: "five",
    SIX: "six",
    MINUS: "minus",
    ONE: "one",
    TWO: "two",
    THREE: "three",
    PLUS: "plus",
    NULL: "null",
    COMMA: "comma",
    CALC: "calc",
  };

  static OPERATION_TYPE = {
    NONE: "none",
    DIVISION: "division",
    MULT: "mult",
    MINUS: "minus",
    PLUS: "plus",
  };

  constructor() {
    this.resetValue();
  }

  resetValue() {
    this.currFirstValue = "0";
    this.currOperation = Model.OPERATION_TYPE.NONE;
    this.currSecondValue = "0";
  }

  changeValueSign() {
    if (this.currOperation === Model.OPERATION_TYPE.NONE) {
      this.currFirstValue =
        this.currFirstValue[0] === "-"
          ? this.currFirstValue.slice(1)
          : "-" + this.currFirstValue;
    } else {
      this.currSecondValue =
        this.currSecondValue[0] === "-"
          ? this.currSecondValue.slice(1)
          : "-" + this.currSecondValue;
    }
  }

  getValuePercent() {
    if (this.currOperation === Model.OPERATION_TYPE.NONE) {
      this.currFirstValue = (Number(this.currFirstValue) / 100).toString();
    } else {
      if (this.currSecondValue) {
        this.currSecondValue = (
          (Number(this.currFirstValue) * Number(this.currSecondValue)) /
          100
        ).toString();
      } else {
        this.currSecondValue = (Number(this.currFirstValue) / 100).toString();
      }
    }
  }

  setDivisionSign() {
    this.currOperation = Model.OPERATION_TYPE.DIVISION;
  }

  setMultSign() {
    this.currOperation = Model.OPERATION_TYPE.MULT;
  }

  setMinusSign() {
    this.currOperation = Model.OPERATION_TYPE.MINUS;
  }

  setPlusSign() {
    this.currOperation = Model.OPERATION_TYPE.PLUS;
  }

  addNumberToValue(numStr) {
    if (this.currOperation === Model.OPERATION_TYPE.NONE) {
      const digitsAmount = this.currFirstValue.replace(/[,|-]/g, "").length;
      if (digitsAmount < 9) {
        if (
          digitsAmount === 1 &&
          this.currFirstValue[this.currFirstValue.length - 1] === "0"
        ) {
          this.currFirstValue = numStr;
        } else {
          this.currFirstValue += numStr;
        }
      }
    } else {
      const digitsAmount = this.currSecondValue.replace(/[,|-]/g, "").length;
      if (digitsAmount < 9) {
        if (
          digitsAmount === 1 &&
          this.currSecondValue[this.currSecondValue.length - 1] === "0"
        ) {
          this.currSecondValue = numStr;
        } else {
          this.currSecondValue += numStr;
        }
      }
    }
  }

  addCommaToValue() {
    if (this.currOperation === Model.OPERATION_TYPE.NONE) {
      if (
        !this.currFirstValue.includes(",") ||
        this.currFirstValue.length < 9
      ) {
        this.currFirstValue += ",";
      }
    } else {
      if (
        !this.currSecondValue.includes(",") ||
        this.currSecondValue.length < 9
      ) {
        this.currSecondValue += ",";
      }
    }
  }

  calculateResult() {
    switch (this.currOperation) {
      case Model.OPERATION_TYPE.DIVISION:
        this.currFirstValue = (
          Number(this.currFirstValue) / Number(this.currSecondValue)
        ).toString();

        break;
      case Model.OPERATION_TYPE.MULT:
        this.currFirstValue = (
          Number(this.currFirstValue) * Number(this.currSecondValue)
        ).toString();

        break;
      case Model.OPERATION_TYPE.MINUS:
        this.currFirstValue = (
          Number(this.currFirstValue) - Number(this.currSecondValue)
        ).toString();

        break;
      case Model.OPERATION_TYPE.PLUS:
        this.currFirstValue = (
          Number(this.currFirstValue) + Number(this.currSecondValue)
        ).toString();

        break;
      default:
        console.warn(
          `Unknown operation type for calculation: ${this.currOperation}`
        );
    }
  }
}

export default Model;
