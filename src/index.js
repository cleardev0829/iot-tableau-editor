import React from "react";
import ReactDOM from "react-dom";
import localforage from "localforage";
import { createStore } from "polotno/model/store";
import { unstable_setRemoveBackgroundEnabled } from "polotno/config";

import "./index.css";
import App from "./App";

var elementHeight = 34 * 3.7795275591;
var elementWidth = 34 * 3.7795275591;

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
  callback();
};

store.on("change", () => {
  const element = store.selectedElements[0];
  if (element && element.type === "image") {
    onResize(element, () => {
      element.set({ height: elementHeight, width: elementWidth });
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
