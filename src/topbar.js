import React from "react";
import { observer } from "mobx-react-lite";
import {
  Button,
  Navbar,
  Alignment,
  // AnchorButton,
  Divider,
  // Dialog,
  // Classes,
} from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";
// import FaGithub from "@meronex/icons/fa/FaGithub";
// import FaDiscord from "@meronex/icons/fa/FaDiscord";
import DownloadButton from "polotno/toolbar/download-button";
import { downloadFile } from "polotno/utils/download";
import styled from "polotno/utils/styled";
import jsPDF from "jspdf";

import { dataURLtoFile, dataURItoBlob, makeid } from "./file";
import uploadFileToBlob from "./utils/azure-storage-blob";
import { rateDown, rateUp } from "./utils/utils";

const NavbarContainer = styled("div")`
  @media screen and (max-width: 500px) {
    overflow-x: auto;
    overflow-y: hidden;
    max-width: 100vw;
  }
`;

const NavInner = styled("div")`
  @media screen and (max-width: 500px) {
    display: flex;
  }
`;

export default observer(({ store }) => {
  const inputRef = React.useRef();

  // const [faqOpened, toggleFaq] = React.useState(false);

  return (
    <NavbarContainer className="bp3-navbar">
      <NavInner>
        <Navbar.Group align={Alignment.LEFT}>
          <Button
            icon="new-object"
            minimal
            onClick={() => {
              console.clear();
              const ids = store.pages
                .map((page) => page.children.map((child) => child.id))
                .flat();
              const hasObjects = ids?.length;
              if (hasObjects) {
                if (!window.confirm("Remove all content for a new design?")) {
                  return;
                }
              }
              const pagesIds = store.pages.map((p) => p.id);
              store.deletePages(pagesIds);
              store.addPage();
            }}
          >
            New
          </Button>
          <label htmlFor="load-project">
            <Button
              icon="folder-open"
              minimal
              onClick={() => {
                document.querySelector("#load-project").click();
              }}
            >
              Load
            </Button>
            <input
              type="file"
              id="load-project"
              accept=".json,.polotno"
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

                  let json;
                  try {
                    json = JSON.parse(text);
                  } catch (e) {
                    alert("Can not load the project.");
                  }

                  if (json) {
                    store.loadJSON(json);
                  }
                };
                reader.onerror = function () {
                  alert("Can not load the project.");
                };
                reader.readAsText(input.files[0]);
              }}
            />
          </label>
          <Button
            icon="floppy-disk"
            minimal
            onClick={() => {
              const json = store.toJSON();
              const url =
                "data:text/json;base64," +
                window.btoa(unescape(encodeURIComponent(JSON.stringify(json))));

              downloadFile(url, "polotno.json");
            }}
          >
            Save
          </Button>
          <Button
            icon="floppy-disk"
            minimal
            onClick={async () => {
              const json = store.toJSON();

              const jsonURL =
                "data:text/json;base64," +
                window.btoa(unescape(encodeURIComponent(JSON.stringify(json))));
              const filename = makeid(30);
              const jsonFile = dataURLtoFile(jsonURL, `${filename}.json`);
              uploadFileToBlob(jsonFile, "tableau-templates");

              const imageBase64 = await store.toDataURL().split("base64,")[1];
              const imageURL = "data:image/png;base64," + imageBase64;
              const imageFile = dataURLtoFile(imageURL, `${filename}.png`);
              uploadFileToBlob(imageFile, "tableau-templates");
            }}
          >
            Save to Template
          </Button>
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <Divider />

          {/* <DownloadButton store={store} /> */}
          <Button
            icon="download"
            minimal
            onClick={async () => {
              const imageBase64 = await store.toDataURL().split("base64,")[1];
              const imageURL = "data:image/png;base64," + imageBase64;

              let pdf = new jsPDF("p", "mm", "a4"); // A4 size page of PDF

              const pdfWidth = pdf.getPageWidth();
              const pdfHeight = pdf.getPageHeight();
              const imgWidth = store.width * rateDown;
              const imgHeight = store.height * rateDown;

              const pos = {
                x: (pdfWidth - imgWidth) / 2,
                y: (pdfHeight - imgHeight) / 2,
              };

              pdf.addImage(imageURL, "PNG", pos.x, pos.y, imgWidth, imgHeight);
              pdf.rect(pos.x, pos.y, imgWidth, imgHeight);

              pdf.save("download.pdf");

              // downloadFile(imageURL, "polotno.png");
              // store.saveAsImage({ ignoreBackground: true });
              // store.saveAsPDF({ ignoreBackground: true });
            }}
          >
            Download
          </Button>
        </Navbar.Group>
      </NavInner>
    </NavbarContainer>
  );
});
