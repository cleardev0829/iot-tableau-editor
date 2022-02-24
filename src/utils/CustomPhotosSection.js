import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import _ from "lodash";
import { SectionTab } from "polotno/side-panel";
import { Tab, Tabs } from "@blueprintjs/core";
import { ImagesGrid } from "polotno/side-panel/images-grid";
import MdPhotoLibrary from "@meronex/icons/md/MdPhotoLibrary";
import { getImageSize } from "polotno/utils/image";
import {
  getBlobsInContainer,
  getBlobsInContainer1,
} from "./azure-storage-blob";

const PhotosPanel = observer(({ store }) => {
  const [images, setImages] = useState([]);
  const [selectedTabId, setSelectedTabId] = useState("MT42");

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    loadTemplates();
  }, [selectedTabId]);

  const loadTemplates = async () => {
    const response = await getBlobsInContainer(
      `tableau-${selectedTabId.toLowerCase()}`
    );
    const urls = _.map(response, "blobUrl");
    setData(urls);
    setLoading(false);
  };

  const handleTabChange = (tabId) => {
    setSelectedTabId(tabId);
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Tabs
        id="Tabs"
        animate={true}
        onChange={handleTabChange}
        selectedTabId={selectedTabId}
      >
        <Tab id="MT42" title="MT42" style={{ marginRight: 10 }} />
        <Tab id="RT42" title="RT42" style={{ marginRight: 10 }} />
        <Tab id="DISPLAYS" title="DISPLAYS" style={{ marginRight: 10 }} />
        <Tab id="ENGRAVINGS" title="ENGRAVINGS" style={{ marginRight: 10 }} />
        <Tab id="OTHERS" title="OTHERS" style={{ marginRight: 10 }} />
      </Tabs>

      <ImagesGrid
        images={data}
        getPreview={(item) => item}
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
        isLoading={!images.length}
        loadMore={false}
      />
    </div>
  );
});
// define the new custom section
const CustomPhotosSection = {
  name: "resources",
  Tab: (props) => (
    <SectionTab name="Resources" {...props}>
      <MdPhotoLibrary />
    </SectionTab>
  ),
  Panel: PhotosPanel,
};

export default CustomPhotosSection;
