"use strict";

import Model from "./main/model.js";
import View from "./main/view.js";
import Controller from "./main/controller.js";

document.addEventListener("DOMContentLoaded", () => {
  new Controller(new View(), new Model()).init();
});
