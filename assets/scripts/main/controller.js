"use strict";

import Model from "./model.js";
import View from "./view.js";

/** Controller class. Orchestrates the model and view objects. A "glue" between them. */
class Controller {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }

  init() {}
}

export default Controller;
