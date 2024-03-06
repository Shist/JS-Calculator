"use strict";

/** View class. Knows everything about DOM and about data structure which should be filled into UI element. */
class View {
  static CLASS = {
    CALCULATOR: {
      WRAPPER: "calculator",
      BTN: "calculator-btn",
      VALUE: "calculator__value",
      CLEAN: "calculator__clean",
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
}

export default View;
