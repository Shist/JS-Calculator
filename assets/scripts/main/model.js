"use strict";

/** Model class for functions that perform different operations */
class Model {
  static BTN_TYPE = {
    CLEAN: "clean",
    PLUS: "plus",
    MINUS: "minus",
    MULT: "mult",
    DIVISION: "division",
    PERCENT: "percent",
    SIGN_CHANGE: "sign-change",
    ONE: "one",
    TWO: "two",
    THREE: "three",
    FOUR: "four",
    FIVE: "five",
    SIX: "six",
    SEVEN: "seven",
    EIGHT: "eight",
    NINE: "nine",
    NULL: "null",
    COMMA: "comma",
    CALC: "calc",
  };

  static NUM_TYPE = {
    NONE: "none",
    FIRST: "first",
    SECOND: "second",
    THIRD: "third",
  };

  static OP_TYPE = {
    NONE: "none",
    PLUS: "plus",
    MINUS: "minus",
    MULT: "mult",
    DIVISION: "division",
  };

  constructor() {
    this.resetAllValues();
  }

  resetFirstNum() {
    this.firstNum = "0";
  }

  resetSecondNum() {
    this.secondNum = "0";
  }

  resetThirdNum() {
    this.thirdNum = "0";
  }

  resetAllValues() {
    this.currNum = Model.NUM_TYPE.FIRST;
    this.firstNum = "0";
    this.firstOp = Model.NOT_OP_TYPE.NONE;
    this.secondNum = "0";
    this.secondOp = Model.OP_TYPE.NONE;
    this.thirdNum = "0";
  }

  setPlusSign() {
    switch (this.currNum) {
      case Model.NUM_TYPE.FIRST:
        this.currNum = Model.NUM_TYPE.SECOND;
        this.secondNum = this.firstNum;
        break;
      case Model.NUM_TYPE.SECOND:
        this.calculateResult();
        break;
      case Model.NUM_TYPE.THIRD:
        this.calculateResult();
        break;
    }
    this.notPriorOp = Model.NOT_PRIOR_OP_TYPE.PLUS;
  }

  setMinusSign() {
    switch (this.currNum) {
      case Model.NUM_TYPE.FIRST:
        this.currNum = Model.NUM_TYPE.SECOND;
        this.secondNum = this.firstNum;
        break;
      case Model.NUM_TYPE.SECOND:
        this.calculateResult();
        break;
      case Model.NUM_TYPE.THIRD:
        this.calculateResult();
        break;
    }
    this.notPriorOp = Model.NOT_PRIOR_OP_TYPE.MINUS;
  }

  setMultSign() {
    switch (this.currNum) {
      case Model.NUM_TYPE.FIRST:
        this.currNum = Model.NUM_TYPE.SECOND;
        this.secondNum = this.firstNum;
        break;
      case Model.NUM_TYPE.SECOND:
        if (this.priorOp === Model.PRIOR_OP_TYPE.NONE) {
          this.currNum = Model.NUM_TYPE.THIRD;
        } else {
          this.calculateResult();
        }
        break;
      case Model.NUM_TYPE.THIRD:
        this.calculateResult();
        break;
    }
    this.priorOp = Model.PRIOR_OP_TYPE.MULT;
  }

  setDivisionSign() {
    switch (this.currNum) {
      case Model.NUM_TYPE.FIRST:
        this.currNum = Model.NUM_TYPE.SECOND;
        this.secondNum = this.firstNum;
        break;
      case Model.NUM_TYPE.SECOND:
        if (this.priorOp === Model.PRIOR_OP_TYPE.NONE) {
          this.currNum = Model.NUM_TYPE.THIRD;
        } else {
          this.calculateResult();
        }
        break;
      case Model.NUM_TYPE.THIRD:
        this.calculateResult();
        break;
    }
    this.priorOp = Model.PRIOR_OP_TYPE.DIVISION;
  }

  getValuePercent() {
    switch (this.currNum) {
      case Model.NUM_TYPE.FIRST:
        this.firstNum = (Number(this.firstNum) / 100).toString();
        break;
      case Model.NUM_TYPE.SECOND:
        if (this.secondNum !== "0") {
          this.secondNum = (
            (Number(this.firstNum) * Number(this.secondNum)) /
            100
          ).toString();
        } else {
          this.secondNum = (
            (Number(this.firstNum) * Number(this.firstNum)) /
            100
          ).toString();
        }
        break;
      case Model.NUM_TYPE.THIRD:
        this.thirdNum = (Number(this.thirdNum) / 100).toString();
        break;
    }
  }

  changeValueSign() {
    switch (this.currNum) {
      case Model.NUM_TYPE.FIRST:
        this.firstNum =
          this.firstNum[0] === "-"
            ? this.firstNum.slice(1)
            : "-" + this.firstNum;
        break;
      case Model.NUM_TYPE.SECOND:
        this.secondNum =
          this.secondNum[0] === "-"
            ? this.secondNum.slice(1)
            : "-" + this.secondNum;
        break;
      case Model.NUM_TYPE.THIRD:
        this.thirdNum =
          this.thirdNum[0] === "-"
            ? this.thirdNum.slice(1)
            : "-" + this.thirdNum;
        break;
    }
  }

  addNumberToValue(numStr) {
    let digitsAmount = null;
    switch (this.currNum) {
      case Model.NUM_TYPE.NONE:
        this.currNum = Model.NUM_TYPE.FIRST;
        this.firstNum = numStr;
        break;
      case Model.NUM_TYPE.FIRST:
        digitsAmount = this.firstNum.replace(/[,|-]/g, "").length;
        if (digitsAmount < 9) {
          if (
            digitsAmount === 1 &&
            this.firstNum[this.firstNum.length - 1] === "0"
          ) {
            this.firstNum = numStr;
          } else {
            this.firstNum += numStr;
          }
        }
        break;
      case Model.NUM_TYPE.SECOND:
        digitsAmount = this.secondNum.replace(/[,|-]/g, "").length;
        if (digitsAmount < 9) {
          if (
            digitsAmount === 1 &&
            this.secondNum[this.secondNum.length - 1] === "0"
          ) {
            this.secondNum = numStr;
          } else {
            this.secondNum += numStr;
          }
        }
        break;
      case Model.NUM_TYPE.THIRD:
        digitsAmount = this.thirdNum.replace(/[,|-]/g, "").length;
        if (digitsAmount < 9) {
          if (
            digitsAmount === 1 &&
            this.thirdNum[this.thirdNum.length - 1] === "0"
          ) {
            this.thirdNum = numStr;
          } else {
            this.thirdNum += numStr;
          }
        }
        break;
    }
  }

  addCommaToValue() {
    switch (this.currNum) {
      case Model.NUM_TYPE.FIRST:
        if (!this.firstNum.includes(".") && this.firstNum.length < 9) {
          this.firstNum += ".";
        }
        break;
      case Model.NUM_TYPE.SECOND:
        if (!this.secondNum.includes(".") && this.secondNum.length < 9) {
          this.secondNum += ".";
        }
        break;
      case Model.NUM_TYPE.THIRD:
        if (!this.thirdNum.includes(".") && this.thirdNum.length < 9) {
          this.thirdNum += ".";
        }
        break;
    }
  }

  calculateResult() {
    switch (this.priorOp) {
      case Model.PRIOR_OP_TYPE.NONE:
        switch (this.notPriorOp) {
          case Model.NOT_PRIOR_OP_TYPE.PLUS:
            this.firstNum = (
              Number(this.firstNum) + Number(this.secondNum)
            ).toString();
            break;
          case Model.NOT_PRIOR_OP_TYPE.MINUS:
            this.firstNum = (
              Number(this.firstNum) - Number(this.secondNum)
            ).toString();
            break;
        }
        break;
      case Model.PRIOR_OP_TYPE.MULT:
        this.secondNum = (
          Number(this.secondNum) * Number(this.thirdNum)
        ).toString();
        switch (this.notPriorOp) {
          case Model.NOT_PRIOR_OP_TYPE.PLUS:
            this.firstNum = (
              Number(this.firstNum) + Number(this.secondNum)
            ).toString();
            break;
          case Model.NOT_PRIOR_OP_TYPE.MINUS:
            this.firstNum = (
              Number(this.firstNum) - Number(this.secondNum)
            ).toString();
            break;
        }
        break;
      case Model.PRIOR_OP_TYPE.DIVISION:
        this.secondNum = (
          Number(this.secondNum) / Number(this.thirdNum)
        ).toString();
        switch (this.notPriorOp) {
          case Model.NOT_PRIOR_OP_TYPE.PLUS:
            this.firstNum = (
              Number(this.firstNum) + Number(this.secondNum)
            ).toString();
            break;
          case Model.NOT_PRIOR_OP_TYPE.MINUS:
            this.firstNum = (
              Number(this.firstNum) - Number(this.secondNum)
            ).toString();
            break;
        }
        break;
    }
    this.currNum = Model.NUM_TYPE.NONE;
  }
}

export default Model;
