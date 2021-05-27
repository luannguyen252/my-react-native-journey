"use strict";

import React from "react";

import _ from "underscore";

export default class Cart {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
    };
  }
}
