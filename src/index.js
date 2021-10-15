import React from "react";
import ReactDOM from "react-dom";
import localforage from "localforage";
import { createStore } from "polotno/model/store";
import { unstable_setRemoveBackgroundEnabled } from "polotno/config";

import "./index.css";
import App from "./App";

var elementHeight = 34;
var elementWidth = 34;

unstable_setRemoveBackgroundEnabled(true);

const store = createStore({ key: "UQKDEeydnVt8g1XADyNV" });
window.store = store;

localforage.getItem("polotno-state", function (err, json) {
  if (json) {
    store.loadJSON(json);
  }
  if (!store.pages.length) {
    store.addPage();
  }
});

const onResize = (element, callback) => {
  // elementHeight = elementHeight === 0 ? element.height : elementHeight;
  // elementWidth = elementWidth === 0 ? element.width : elementWidth;

  callback();
};

store.on("change", () => {
  const element = store.selectedElements[0];
  if (element && element.type === "image") {
    onResize(element, () => {
      console.log(elementHeight, elementWidth);
      element.set({ height: elementHeight });
      element.set({ width: elementWidth });
    });
  }

  try {
    const json = store.toJSON();
    localforage.setItem("polotno-state", json);
  } catch (e) {}
});

ReactDOM.render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>,
  document.getElementById("root")
);
