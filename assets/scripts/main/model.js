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

  static CURR_NUM_TYPE = {
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

  cleanFirstNum() {
    this.firstNum = "0";
  }

  cleanSecondNum() {
    this.secondNum = "0";
  }

  cleanThirdNum() {
    this.thirdNum = "0";
  }

  resetAllValues() {
    this.currNum = Model.CURR_NUM_TYPE.FIRST;
    this.firstNum = "0";
    this.firstOp = Model.OP_TYPE.NONE;
    this.secondNum = "";
    this.secondOp = Model.OP_TYPE.NONE;
    this.thirdNum = "";
  }

  setPlusSign() {
    switch (this.currNum) {
      case Model.CURR_NUM_TYPE.FIRST:
        this.currNum = Model.CURR_NUM_TYPE.SECOND;
        this.firstOp = Model.OP_TYPE.PLUS;
        break;
      case Model.CURR_NUM_TYPE.SECOND:
        if (this.secondNum) {
          this.calculateResult();
        } else {
          this.firstOp = Model.OP_TYPE.PLUS;
        }
        break;
      case Model.CURR_NUM_TYPE.THIRD:
        this.calculateResult();
        break;
    }
  }

  setMinusSign() {
    switch (this.currNum) {
      case Model.CURR_NUM_TYPE.FIRST:
        this.currNum = Model.CURR_NUM_TYPE.SECOND;
        this.firstOp = Model.OP_TYPE.MINUS;
        break;
      case Model.CURR_NUM_TYPE.SECOND:
        if (this.secondNum) {
          this.calculateResult();
        } else {
          this.firstOp = Model.OP_TYPE.MINUS;
        }
        break;
      case Model.CURR_NUM_TYPE.THIRD:
        this.calculateResult();
        break;
    }
  }

  setMultSign() {
    switch (this.currNum) {
      case Model.CURR_NUM_TYPE.FIRST:
        this.currNum = Model.CURR_NUM_TYPE.SECOND;
        this.firstOp = Model.OP_TYPE.MULT;
        break;
      case Model.CURR_NUM_TYPE.SECOND:
        if (this.secondNum) {
          if (
            this.firstOp === Model.OP_TYPE.PLUS ||
            this.firstOp === Model.OP_TYPE.MINUS
          ) {
            this.currNum = Model.CURR_NUM_TYPE.THIRD;
            this.secondOp = Model.OP_TYPE.MULT;
          } else {
            this.calculateResult();
          }
        } else {
          this.firstOp = Model.OP_TYPE.MULT;
        }
        break;
      case Model.CURR_NUM_TYPE.THIRD:
        if (this.thirdNum) {
          this.calculateResult();
        } else {
          this.secondOp = Model.OP_TYPE.MULT;
        }
        break;
    }
  }

  setDivisionSign() {
    switch (this.currNum) {
      case Model.CURR_NUM_TYPE.FIRST:
        this.currNum = Model.CURR_NUM_TYPE.SECOND;
        this.firstOp = Model.OP_TYPE.DIVISION;
        break;
      case Model.CURR_NUM_TYPE.SECOND:
        if (this.secondNum) {
          if (
            this.firstOp === Model.OP_TYPE.PLUS ||
            this.firstOp === Model.OP_TYPE.MINUS
          ) {
            this.currNum = Model.CURR_NUM_TYPE.THIRD;
            this.secondOp = Model.OP_TYPE.DIVISION;
          } else {
            this.calculateResult();
          }
        } else {
          this.firstOp = Model.OP_TYPE.DIVISION;
        }
        break;
      case Model.CURR_NUM_TYPE.THIRD:
        if (this.thirdNum) {
          this.calculateResult();
        } else {
          this.secondOp = Model.OP_TYPE.DIVISION;
        }
        break;
    }
  }

  getValuePercent() {
    switch (this.currNum) {
      case Model.CURR_NUM_TYPE.FIRST:
        this.firstNum = (Number(this.firstNum) / 100).toString();
        break;
      case Model.CURR_NUM_TYPE.SECOND:
        if (
          this.firstOp === Model.OP_TYPE.PLUS ||
          this.firstOp === Model.OP_TYPE.MINUS
        ) {
          if (this.secondNum) {
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
        } else {
          if (this.secondNum) {
            this.secondNum = (Number(this.secondNum) / 100).toString();
          } else {
            this.secondNum = (Number(this.firstNum) / 100).toString();
          }
        }
        break;
      case Model.CURR_NUM_TYPE.THIRD:
        this.thirdNum = (Number(this.thirdNum) / 100).toString();
        break;
    }
  }

  changeValueSign() {
    switch (this.currNum) {
      case Model.CURR_NUM_TYPE.FIRST:
        this.firstNum =
          this.firstNum[0] === "-"
            ? this.firstNum.slice(1)
            : "-" + this.firstNum;
        break;
      case Model.CURR_NUM_TYPE.SECOND:
        this.secondNum =
          this.secondNum[0] === "-"
            ? this.secondNum.slice(1)
            : "-" + this.secondNum;
        break;
      case Model.CURR_NUM_TYPE.THIRD:
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
      case Model.CURR_NUM_TYPE.FIRST:
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
      case Model.CURR_NUM_TYPE.SECOND:
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
      case Model.CURR_NUM_TYPE.THIRD:
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
    let digitsAmount = null;
    switch (this.currNum) {
      case Model.CURR_NUM_TYPE.FIRST:
        digitsAmount = this.firstNum.replace(/[,|-]/g, "").length;
        if (!this.firstNum.includes(".") && digitsAmount < 9) {
          this.firstNum += ".";
        }
        break;
      case Model.CURR_NUM_TYPE.SECOND:
        digitsAmount = this.secondNum.replace(/[,|-]/g, "").length;
        if (!this.secondNum.includes(".") && digitsAmount < 9) {
          this.secondNum += ".";
        }
        break;
      case Model.CURR_NUM_TYPE.THIRD:
        digitsAmount = this.thirdNum.replace(/[,|-]/g, "").length;
        if (!this.thirdNum.includes(".") && digitsAmount < 9) {
          this.thirdNum += ".";
        }
        break;
    }
  }

  calculateResult() {
    switch (this.secondOp) {
      case Model.OP_TYPE.MULT:
        this.secondNum = (
          Number(this.secondNum) * Number(this.thirdNum)
        ).toString();
        break;
      case Model.OP_TYPE.DIVISION:
        this.secondNum = (
          Number(this.secondNum) / Number(this.thirdNum)
        ).toString();
        break;
    }

    switch (this.firstOp) {
      case Model.OP_TYPE.PLUS:
        this.firstNum = (
          Number(this.firstNum) + Number(this.secondNum)
        ).toString();
        break;
      case Model.OP_TYPE.MINUS:
        this.firstNum = (
          Number(this.firstNum) - Number(this.secondNum)
        ).toString();
        break;
      case Model.OP_TYPE.MULT:
        this.firstNum = (
          Number(this.firstNum) * Number(this.secondNum)
        ).toString();
        break;
      case Model.OP_TYPE.DIVISION:
        this.firstNum = (
          Number(this.firstNum) / Number(this.secondNum)
        ).toString();
        break;
    }
  }
}

export default Model;
