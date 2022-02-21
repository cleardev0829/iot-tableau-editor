import React from "react";
import FaShapes from "@meronex/icons/fa/FaShapes";
import { SectionTab } from "polotno/side-panel";
import { observer } from "mobx-react-lite";
import { Button } from "@blueprintjs/core";
import { dataURLtoFile, makeid } from "../file";
import uploadFileToBlob from "./azure-storage-blob";

const CustomUploadSection = {
  name: "custom",
  Tab: (props) => (
    <SectionTab name="Upload" {...props}>
      <FaShapes icon="new-text-box" />
    </SectionTab>
  ),
  // we need observer to update component automatically on any store changes
  Panel: observer(({ store }) => {
    const inputRef = React.useRef();

    return (
      <div>
        <p>Upload photos you like here</p>
        <label htmlFor="load-project">
          <Button
            icon={"icon"}
            style={{ width: "100%", marginBottom: "20px" }}
            onClick={() => {
              document.querySelector("#load-project").click();
            }}
          >
            Upload Image
          </Button>
          <input
            type="file"
            id="load-project"
            accept=".png"
            ref={inputRef}
            style={{ width: "180px", display: "none" }}
            onChange={(e) => {
              var input = e.target;

              if (!input.files.length) {
                return;
              }

              var reader = new FileReader();
              reader.onloadend = function () {
                var text = reader.result;

                const imageURL = `data:image/png;base64,${btoa(reader.result)}`;
                const imageFile = dataURLtoFile(imageURL, `${makeid(40)}.png`);
                uploadFileToBlob(imageFile);
              };
              reader.onerror = function () {
                alert("Can not load the project.");
              };
            }}
          />
        </label>
      </div>
    );
  }),
};

export default CustomUploadSection;
