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

  _onCalculatorClicked(e) {
    const currTarget = e.target;

    if (!currTarget.dataset[View.DATA_ATTRIBUTE.CALCULATOR.BTN_TYPE.CAMEL]) {
      return;
    }

    switch (currTarget.dataset[View.DATA_ATTRIBUTE.CALCULATOR.BTN_TYPE.CAMEL]) {
      case Model.BTN_TYPE.CLEAN:
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
          this.view.setCalculatorValue(this.model.firstNum);
        }
        break;
      case Model.BTN_TYPE.SIGN_CHANGE:
        this.model.changeValueSign();
        this._showCurrentNum();
        break;
      case Model.BTN_TYPE.PERCENT:
        this.model.getValuePercent();
        this._showCurrentNum();
        break;
      case Model.BTN_TYPE.DIVISION:
        this.model.setDivisionSign();
        this._showCurrentNum();
        this.view.makeOperationBtnActive(View.CLASS.CALCULATOR.DIVISION);
        break;
      case Model.BTN_TYPE.SEVEN:
        this.model.addNumberToValue("7");
        this.cleanBtnState = "C";
        this.view.setCleanBtnState(this.cleanBtnState);
        this._showCurrentNum();
        this.view.cleanAllOperationBtns();
        break;
      case Model.BTN_TYPE.EIGHT:
        this.model.addNumberToValue("8");
        this.cleanBtnState = "C";
        this.view.setCleanBtnState(this.cleanBtnState);
        this._showCurrentNum();
        this.view.cleanAllOperationBtns();
        break;
      case Model.BTN_TYPE.NINE:
        this.model.addNumberToValue("9");
        this.cleanBtnState = "C";
        this.view.setCleanBtnState(this.cleanBtnState);
        this._showCurrentNum();
        this.view.cleanAllOperationBtns();
        break;
      case Model.BTN_TYPE.MULT:
        this.model.setMultSign();
        this._showCurrentNum();
        this.view.makeOperationBtnActive(View.CLASS.CALCULATOR.MULT);
        break;
      case Model.BTN_TYPE.FOUR:
        this.model.addNumberToValue("4");
        this.cleanBtnState = "C";
        this.view.setCleanBtnState(this.cleanBtnState);
        this._showCurrentNum();
        this.view.cleanAllOperationBtns();
        break;
      case Model.BTN_TYPE.FIVE:
        this.model.addNumberToValue("5");
        this.cleanBtnState = "C";
        this.view.setCleanBtnState(this.cleanBtnState);
        this._showCurrentNum();
        this.view.cleanAllOperationBtns();
        break;
      case Model.BTN_TYPE.SIX:
        this.model.addNumberToValue("6");
        this.cleanBtnState = "C";
        this.view.setCleanBtnState(this.cleanBtnState);
        this._showCurrentNum();
        this.view.cleanAllOperationBtns();
        break;
      case Model.BTN_TYPE.MINUS:
        this.model.setMinusSign();
        this._showCurrentNum();
        this.view.makeOperationBtnActive(View.CLASS.CALCULATOR.MINUS);
        break;
      case Model.BTN_TYPE.ONE:
        this.model.addNumberToValue("1");
        this.cleanBtnState = "C";
        this.view.setCleanBtnState(this.cleanBtnState);
        this._showCurrentNum();
        this.view.cleanAllOperationBtns();
        break;
      case Model.BTN_TYPE.TWO:
        this.model.addNumberToValue("2");
        this.cleanBtnState = "C";
        this.view.setCleanBtnState(this.cleanBtnState);
        this._showCurrentNum();
        this.view.cleanAllOperationBtns();
        break;
      case Model.BTN_TYPE.THREE:
        this.model.addNumberToValue("3");
        this.cleanBtnState = "C";
        this.view.setCleanBtnState(this.cleanBtnState);
        this._showCurrentNum();
        this.view.cleanAllOperationBtns();
        break;
      case Model.BTN_TYPE.PLUS:
        this.model.setPlusSign();
        this._showCurrentNum();
        this.view.makeOperationBtnActive(View.CLASS.CALCULATOR.PLUS);
        break;
      case Model.BTN_TYPE.NULL:
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
        break;
      case Model.BTN_TYPE.COMMA:
        this.model.addCommaToValue();
        this.cleanBtnState = "C";
        this.view.setCleanBtnState(this.cleanBtnState);
        this._showCurrentNum();
        this.view.cleanAllOperationBtns();
        break;
      case Model.BTN_TYPE.CALC:
        this.model.calculateResult();
        this.view.setCalculatorValue(this.model.firstNum);
        this.view.cleanAllOperationBtns();
        break;
    }
  }
}

export default Controller;
