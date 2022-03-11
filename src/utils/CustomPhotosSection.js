import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import _ from "lodash";
import { SectionTab } from "polotno/side-panel";
import { Tab, Tabs } from "@blueprintjs/core";
import { ImagesGrid } from "polotno/side-panel/images-grid";
import MdPhotoLibrary from "@meronex/icons/md/MdPhotoLibrary";
import { getImageSize } from "polotno/utils/image";
import axios from "axios";
import { API_URL, prefix } from "./utils";

const PhotosPanel = observer(({ store }) => {
  const [selectedTabId, setSelectedTabId] = useState(null);
  const [tabs, setTabs] = useState([]);

  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.post(
        `${API_URL}/azure/listContainersInStorage`,
        {}
      );
      const data = await response.data;
      const _data = _.filter(
        data,
        (item) =>
          item.name.split("-")[0] === prefix &&
          item.name !== "tableau-templates"
      );

      setTabs(_data);
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (tabs.length > 0) {
      setSelectedTabId(tabs[0].name);
    }
  }, [tabs]);

  useEffect(() => {
    loadTemplates(selectedTabId);
  }, [selectedTabId]);

  const handleTabChange = (tabId) => {
    setSelectedTabId(tabId);
  };

  const loadTemplates = async (tabId) => {
    if (!tabId) return;

    const response = await axios.post(`${API_URL}/azure/getBlobsInContainer `, {
      containerName: tabId,
    });
    const data = await response.data;

    const urls = _.map(data, "blobUrl");
    setData(urls);
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Tabs
        id="Tabs"
        animate={true}
        onChange={handleTabChange}
        selectedTabId={selectedTabId}
        vertical={tabs.length > 5 ? true : false}
      >
        {tabs.map((tab) => (
          <Tab
            id={tab.name}
            key={tab.id}
            title={tab.name.substr(prefix.length + 1)}
            style={{ marginRight: 10 }}
          />
        ))}
      </Tabs>

      <ImagesGrid
        images={data}
        getPreview={(item) => item}
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
        isLoading={!tabs.length}
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
