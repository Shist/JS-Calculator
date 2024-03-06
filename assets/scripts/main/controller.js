"use strict";

import Model from "./model.js";
import View from "./view.js";

/** Controller class. Orchestrates the model and view objects. A "glue" between them. */
class Controller {
  constructor(view, model) {
    this.view = view;
    this.model = model;
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
        this.model.resetValue();
        this.view.setCalculatorValue(this.model.currFirstValue);
        break;
      case Model.BTN_TYPE.SIGN_CHANGE:
        this.model.changeValueSign();
        this.view.setCalculatorValue(
          this.model.currOperation === Model.OPERATION_TYPE.NONE
            ? this.model.currFirstValue
            : this.model.currSecondValue
        );
        break;
      case Model.BTN_TYPE.PERCENT:
        this.model.getValuePercent();
        this.view.setCalculatorValue(
          this.model.currOperation === Model.OPERATION_TYPE.NONE
            ? this.model.currFirstValue
            : this.model.currSecondValue
        );
        break;
      case Model.BTN_TYPE.DIVISION:
        this.model.setDivisionSign();
        this.view.setCalculatorValue(this.model.currFirstValue);
        this.view.makeOperationBtnActive(View.CLASS.CALCULATOR.DIVISION);
        break;
      case Model.BTN_TYPE.SEVEN:
        this.model.addNumberToValue("7");
        this.view.setCalculatorValue(
          this.model.currOperation === Model.OPERATION_TYPE.NONE
            ? this.model.currFirstValue
            : this.model.currSecondValue
        );
        this.view.cleanAllOperationBtns();
        break;
      case Model.BTN_TYPE.EIGHT:
        this.model.addNumberToValue("8");
        this.view.setCalculatorValue(
          this.model.currOperation === Model.OPERATION_TYPE.NONE
            ? this.model.currFirstValue
            : this.model.currSecondValue
        );
        this.view.cleanAllOperationBtns();
        break;
      case Model.BTN_TYPE.NINE:
        this.model.addNumberToValue("9");
        this.view.setCalculatorValue(
          this.model.currOperation === Model.OPERATION_TYPE.NONE
            ? this.model.currFirstValue
            : this.model.currSecondValue
        );
        this.view.cleanAllOperationBtns();
        break;
      case Model.BTN_TYPE.MULT:
        this.model.setMultSign();
        this.view.setCalculatorValue(this.model.currFirstValue);
        this.view.makeOperationBtnActive(View.CLASS.CALCULATOR.MULT);
        break;
      case Model.BTN_TYPE.FOUR:
        this.model.addNumberToValue("4");
        this.view.setCalculatorValue(
          this.model.currOperation === Model.OPERATION_TYPE.NONE
            ? this.model.currFirstValue
            : this.model.currSecondValue
        );
        this.view.cleanAllOperationBtns();
        break;
      case Model.BTN_TYPE.FIVE:
        this.model.addNumberToValue("5");
        this.view.setCalculatorValue(
          this.model.currOperation === Model.OPERATION_TYPE.NONE
            ? this.model.currFirstValue
            : this.model.currSecondValue
        );
        this.view.cleanAllOperationBtns();
        break;
      case Model.BTN_TYPE.SIX:
        this.model.addNumberToValue("6");
        this.view.setCalculatorValue(
          this.model.currOperation === Model.OPERATION_TYPE.NONE
            ? this.model.currFirstValue
            : this.model.currSecondValue
        );
        this.view.cleanAllOperationBtns();
        break;
      case Model.BTN_TYPE.MINUS:
        this.model.setMinusSign();
        this.view.setCalculatorValue(this.model.currFirstValue);
        this.view.makeOperationBtnActive(View.CLASS.CALCULATOR.MINUS);
        break;
      case Model.BTN_TYPE.ONE:
        this.model.addNumberToValue("1");
        this.view.setCalculatorValue(
          this.model.currOperation === Model.OPERATION_TYPE.NONE
            ? this.model.currFirstValue
            : this.model.currSecondValue
        );
        this.view.cleanAllOperationBtns();
        break;
      case Model.BTN_TYPE.TWO:
        this.model.addNumberToValue("2");
        this.view.setCalculatorValue(
          this.model.currOperation === Model.OPERATION_TYPE.NONE
            ? this.model.currFirstValue
            : this.model.currSecondValue
        );
        this.view.cleanAllOperationBtns();
        break;
      case Model.BTN_TYPE.THREE:
        this.model.addNumberToValue("3");
        this.view.setCalculatorValue(
          this.model.currOperation === Model.OPERATION_TYPE.NONE
            ? this.model.currFirstValue
            : this.model.currSecondValue
        );
        this.view.cleanAllOperationBtns();
        break;
      case Model.BTN_TYPE.PLUS:
        this.model.setPlusSign();
        this.view.setCalculatorValue(this.model.currFirstValue);
        this.view.makeOperationBtnActive(View.CLASS.CALCULATOR.PLUS);
        break;
      case Model.BTN_TYPE.NULL:
        this.model.addNumberToValue("0");
        this.view.setCalculatorValue(
          this.model.currOperation === Model.OPERATION_TYPE.NONE
            ? this.model.currFirstValue
            : this.model.currSecondValue
        );
        this.view.cleanAllOperationBtns();
        break;
      case Model.BTN_TYPE.COMMA:
        this.model.addCommaToValue();
        this.view.setCalculatorValue(
          this.model.currOperation === Model.OPERATION_TYPE.NONE
            ? this.model.currFirstValue
            : this.model.currSecondValue
        );
        this.view.cleanAllOperationBtns();
        break;
      case Model.BTN_TYPE.CALC:
        this.model.calculateResult();
        this.view.setCalculatorValue(this.model.currFirstValue);
        this.view.cleanAllOperationBtns();
        break;
      default:
        console.warn(
          `One of calculator buttons had unknown data-${
            View.DATA_ATTRIBUTE.CALCULATOR.BTN_TYPE.KEBAB
          } type: ${
            e.target.dataset[View.DATA_ATTRIBUTE.CALCULATOR.BTN_TYPE.CAMEL]
          }`
        );
    }
  }
}

export default Controller;
