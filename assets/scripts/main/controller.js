"use strict";

import Model from "./model.js";
import View from "./view.js";

/** Controller class. Orchestrates the model and view objects. A "glue" between them. */
class Controller {
  constructor(view, model) {
    this.view = view;
    this.model = model;
    this.cleanBtnState = "AC";
  }

  init() {
    this._setCalculatorBtnsListener();
  }

  _setCalculatorBtnsListener() {
    const calculatorWrapper = this.view.getCalculatorWrapper();

    calculatorWrapper.addEventListener(
      "click",
      this._onCalculatorClicked.bind(this)
    );
  }

  _onCalculatorClicked(e) {
    const currTarget = e.target;

    if (!currTarget.dataset[View.DATA_ATTRIBUTE.CALCULATOR.BTN_TYPE.CAMEL]) {
      return;
    }

    switch (currTarget.dataset[View.DATA_ATTRIBUTE.CALCULATOR.BTN_TYPE.CAMEL]) {
      case Model.BTN_TYPE.CLEAN:
        this._cleanBtnClicked();
        break;
      case Model.BTN_TYPE.PLUS:
        this._plusBtnClicked();
        break;
      case Model.BTN_TYPE.MINUS:
        this._minusBtnClicked();
        break;
      case Model.BTN_TYPE.MULT:
        this._multBtnClicked();
        break;
      case Model.BTN_TYPE.DIVISION:
        this._divisionBtnClicked();
        break;
      case Model.BTN_TYPE.PERCENT:
        this._percentBtnClicked();
        break;
      case Model.BTN_TYPE.SIGN_CHANGE:
        this._signChangeValueBtnClicked();
        break;
      case Model.BTN_TYPE.ONE:
        this._digitBtnClicked("1");
        break;
      case Model.BTN_TYPE.TWO:
        this._digitBtnClicked("2");
        break;
      case Model.BTN_TYPE.THREE:
        this._digitBtnClicked("3");
        break;
      case Model.BTN_TYPE.FOUR:
        this._digitBtnClicked("4");
        break;
      case Model.BTN_TYPE.FIVE:
        this._digitBtnClicked("5");
        break;
      case Model.BTN_TYPE.SIX:
        this._digitBtnClicked("6");
        break;
      case Model.BTN_TYPE.SEVEN:
        this._digitBtnClicked("7");
        break;
      case Model.BTN_TYPE.EIGHT:
        this._digitBtnClicked("8");
        break;
      case Model.BTN_TYPE.NINE:
        this._digitBtnClicked("9");
        break;
      case Model.BTN_TYPE.NULL:
        this._nullBtnClicked();
        break;
      case Model.BTN_TYPE.COMMA:
        this._commaBtnClicked();
        break;
      case Model.BTN_TYPE.CALC:
        this._calcBtnClicked();
        break;
    }

    console.log(`FirstNum = ${this.model.firstNum}`);
    console.log(`SecondNum = ${this.model.secondNum}`);
    console.log(`ThirdNum = ${this.model.thirdNum}`);
    console.log(`currNum = ${this.model.currNum}`);
  }

  _cleanBtnClicked() {
    if (this.cleanBtnState === "C") {
      switch (this.model.currNum) {
        case Model.NUM_TYPE.FIRST:
          this.model.resetFirstValue();
          this.view.setCalculatorValue(this.model.firstNum);
          break;
        case Model.NUM_TYPE.SECOND:
          this.model.resetSecondValue();
          this.view.setCalculatorValue(this.model.secondNum);
          break;
        case Model.NUM_TYPE.THIRD:
          this.model.resetThirdValue();
          this.view.setCalculatorValue(this.model.thirdNum);
          break;
      }
      this.cleanBtnState = "AC";
      this.view.setCleanBtnState(this.cleanBtnState);
    } else {
      this.model.resetCurrNum();
      this.model.resetFirstValue();
      this.model.resetSecondValue();
      this.model.resetThirdValue();
      this.model.resetNotPriorOperation();
      this.model.resetPriorOperation();
      this.view.cleanAllOperationBtns();
      this.view.setCalculatorValue(this.model.firstNum);
    }
  }

  _signChangeValueBtnClicked() {
    this.model.changeValueSign();
    this._showCurrentNum();
  }

  _percentBtnClicked() {
    this.model.getValuePercent();
    this._showCurrentNum();
  }

  _divisionBtnClicked() {
    this.model.setDivisionSign();
    this._showCurrentNum();
    this.view.makeOperationBtnActive(View.CLASS.CALCULATOR.DIVISION);
  }

  _digitBtnClicked(numStr) {
    this.model.addNumberToValue(numStr);
    this.cleanBtnState = "C";
    this.view.setCleanBtnState(this.cleanBtnState);
    this._showCurrentNum();
    this.view.cleanAllOperationBtns();
  }

  _multBtnClicked() {
    this.model.setMultSign();
    this._showCurrentNum();
    this.view.makeOperationBtnActive(View.CLASS.CALCULATOR.MULT);
  }

  _minusBtnClicked() {
    this.model.setMinusSign();
    this._showCurrentNum();
    this.view.makeOperationBtnActive(View.CLASS.CALCULATOR.MINUS);
  }

  _plusBtnClicked() {
    this.model.setPlusSign();
    this._showCurrentNum();
    this.view.makeOperationBtnActive(View.CLASS.CALCULATOR.PLUS);
  }

  _nullBtnClicked() {
    this.model.addNumberToValue("0");
    switch (this.model.currNum) {
      case Model.NUM_TYPE.FIRST:
        if (this.model.firstNum !== "0") {
          this.cleanBtnState = "C";
          this.view.setCleanBtnState(this.cleanBtnState);
        }
        break;
      case Model.NUM_TYPE.SECOND:
        if (this.model.secondNum !== "0") {
          this.cleanBtnState = "C";
          this.view.setCleanBtnState(this.cleanBtnState);
        }
        break;
      case Model.NUM_TYPE.THIRD:
        if (this.model.thirdNum !== "0") {
          this.cleanBtnState = "C";
          this.view.setCleanBtnState(this.cleanBtnState);
        }
        break;
    }
    this._showCurrentNum();
    this.view.cleanAllOperationBtns();
  }

  _commaBtnClicked() {
    this.model.addCommaToValue();
    this.cleanBtnState = "C";
    this.view.setCleanBtnState(this.cleanBtnState);
    this._showCurrentNum();
    this.view.cleanAllOperationBtns();
  }

  _calcBtnClicked() {
    this.model.calculateResult();
    this.view.setCalculatorValue(this.model.firstNum);
    this.view.cleanAllOperationBtns();
  }

  _showCurrentNum() {
    switch (this.model.currNum) {
      case Model.NUM_TYPE.FIRST:
        this.view.setCalculatorValue(this.model.firstNum);
        break;
      case Model.NUM_TYPE.SECOND:
        this.view.setCalculatorValue(this.model.secondNum);
        break;
      case Model.NUM_TYPE.THIRD:
        this.view.setCalculatorValue(this.model.thirdNum);
        break;
    }
  }
}

export default Controller;
