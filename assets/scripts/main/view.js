"use strict";

/** View class. Knows everything about DOM and about data structure which should be filled into UI element. */
class View {
  static CLASS = {
    CALCULATOR: {
      WRAPPER: "calculator",
      SPEC_BTN: "spec-operation-btn",
      BASIC_BTN: "basic-operation-btn",
      ACTIVE_BASIC_BTN: "active-operation-btn",
      DIGIT_BTN: "digit-btn",
      VALUE: "calculator__value",
      CLEAN: "calculator__clean-btn",
      SIGN_CHANGE: "calculator__sign-change-btn",
      PERCENT: "calculator__percent-btn",
      DIVISION: "calculator__division-btn",
      SEVEN: "calculator__seven-btn",
      EIGHT: "calculator__eight-btn",
      NINE: "calculator__nine-btn",
      MULT: "calculator__mult-btn",
      FOUR: "calculator__four-btn",
      FIVE: "calculator__five-btn",
      SIX: "calculator__six-btn",
      MINUS: "calculator__minus-btn",
      ONE: "calculator__one-btn",
      TWO: "calculator__two-btn",
      THREE: "calculator__three-btn",
      PLUS: "calculator__plus-btn",
      NULL: "calculator__null-btn",
      COMMA: "calculator__comma-btn",
      CALC: "calculator__calc-btn",
    },
  };

  static DATA_ATTRIBUTE = {
    CALCULATOR: {
      BTN_TYPE: {
        KEBAB: "btn-type",
        CAMEL: "btnType",
      },
    },
  };

  getCalculatorWrapper() {
    return document.querySelector(`.${View.CLASS.CALCULATOR.WRAPPER}`);
  }

  setCalculatorValue(newValue) {
    document.querySelector(`.${View.CLASS.CALCULATOR.VALUE}`).textContent =
      newValue.replace(/\./g, ",");

    return this;
  }

  setCleanBtnState(newText) {
    document.querySelector(`.${View.CLASS.CALCULATOR.CLEAN}`).textContent =
      newText;

    return this;
  }

  cleanAllOperationBtns() {
    document
      .querySelectorAll(`.${View.CLASS.CALCULATOR.BASIC_BTN}`)
      .forEach((btn) =>
        btn.classList.remove(View.CLASS.CALCULATOR.ACTIVE_BASIC_BTN)
      );

    return this;
  }

  makeOperationBtnActive(btnClass) {
    this.cleanAllOperationBtns();
    document
      .querySelector(`.${btnClass}`)
      .classList.add(View.CLASS.CALCULATOR.ACTIVE_BASIC_BTN);

    return this;
  }
}

export default View;
