import React from "react";
import ReactDOM from "react-dom";
import localforage from "localforage";
import { createStore } from "polotno/model/store";
import { unstable_setRemoveBackgroundEnabled } from "polotno/config";
import "./index.css";
import App from "./App";

unstable_setRemoveBackgroundEnabled(true);

const store = createStore({ key: "UQKDEeydnVt8g1XADyNV" });
window.store = store;

store.setSize(1932, 1932);

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
  const elements = store.selectedElements;
  elements.map((element) => {
    console.log("element", element);
    if (element && element.type === "image") {
      if (element.custom) {
        onResize(element, () => {
          element.set({
            height: element.custom.height,
            width: element.custom.width,
          });
        });
      } else {
        element.set({
          custom: { width: element.width, height: element.height },
        });
      }
    }
  });

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
