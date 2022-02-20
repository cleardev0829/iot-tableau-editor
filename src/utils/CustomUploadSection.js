import React from "react";
import FaShapes from "@meronex/icons/fa/FaShapes";
import { SectionTab } from "polotno/side-panel";
import { observer } from "mobx-react-lite";
import { Button } from "@blueprintjs/core";

const CustomUploadSection = {
  name: "custom",
  Tab: (props) => (
    <SectionTab name="Upload" {...props}>
      <FaShapes icon="new-text-box" />
    </SectionTab>
  ),
  // we need observer to update component automatically on any store changes
  Panel: observer(({ store }) => {
    return (
      <div>
        <p>Upload photos you like here</p>
        <Button
          icon={"icon"}
          style={{ width: "100%", marginBottom: "20px" }}
          onClick={() => {
            document.querySelector("#load-project").click();
          }}
        >
          Upload Image
        </Button>
      </div>
    );
  }),
};

export default CustomUploadSection;
