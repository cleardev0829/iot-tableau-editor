import React, { useEffect, useState } from "react";
import _ from "lodash";
import FaShapes from "@meronex/icons/fa/FaShapes";
import { SectionTab } from "polotno/side-panel";
import { observer } from "mobx-react-lite";
import { Button } from "@blueprintjs/core";
import { dataURLtoFile, makeid } from "../file";
import { ImagesGrid } from "polotno/side-panel/images-grid";
import { getBlobsInContainer, uploadFileToBlob } from "./azure-storage-blob";
import { getImageSize } from "polotno/utils/image";

const CustomUploadSection = {
  name: "custom",
  Tab: (props) => (
    <SectionTab name="Upload" {...props}>
      <FaShapes icon="new-text-box" />
    </SectionTab>
  ),
  // we need observer to update component automatically on any store changes
  Panel: observer(({ store }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const inputRef = React.useRef();

    useEffect(() => {
      loadImages();
    }, []);

    const loadImages = async () => {
      const response = await getBlobsInContainer("tableau-images");
      const urls = _.map(response, "blobUrl");
      setData(urls);
      setLoading(false);
    };

    return (
      <div>
        <p>Upload photos you like here</p>
        <label htmlFor="load-project">
          <Button
            icon={"icon"}
            style={{ width: "100%", marginBottom: "20px" }}
            onClick={() => {
              document.querySelector("#load-image").click();
            }}
          >
            Upload Image
          </Button>
          <input
            type="file"
            id="load-image"
            accept="image/*"
            ref={inputRef}
            style={{ width: "180px", display: "none" }}
            onChange={(e) => {
              var input = e.target;

              if (!input.files.length) {
                alert("no files");
                return;
              }

              var reader = new FileReader();
              reader.onloadend = function () {
                var text = reader.result;

                const imageURL = `data:image/png;base64,${window.btoa(
                  unescape(encodeURIComponent(text))
                )}`;
                const imageFile = dataURLtoFile(imageURL, `${makeid(30)}.png`);
                console.log(imageURL, imageFile);
                uploadFileToBlob(imageFile, "tableau-images").then(() =>
                  loadImages()
                );
              };
              reader.onerror = function () {
                alert("Can not load the project.");
              };
              reader.readAsText(input.files[0]);
            }}
          />
        </label>

        <ImagesGrid
          shadowEnabled={false}
          images={data}
          getPreview={(item) => {
            return item;
          }}
          isLoading={loading}
          onSelect={async (image, pos, element) => {
            // image - an item from your array
            // pos - relative mouse position on drop. undefined if user just clicked on image
            // element - model from your store if images was dropped on an element.
            //    Can be useful if you want to change some props on existing element instead of creating a new one
            const { width, height } = await getImageSize(image);
            store.activePage.addElement({
              type: "image",
              src: image,
              width,
              height,
              x: pos?.x || 0,
              y: pos?.y || 0,
            });
          }}
          rowsNumber={2}
          isLoading={!data.length}
          loadMore={false}
        />
      </div>
    );
  }),
};

export default CustomUploadSection;
