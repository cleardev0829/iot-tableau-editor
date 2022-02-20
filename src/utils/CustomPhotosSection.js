import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import _ from "lodash";
import { SectionTab } from "polotno/side-panel";
import { Tab, Tabs } from "@blueprintjs/core";
import { ImagesGrid } from "polotno/side-panel/images-grid";
import MdPhotoLibrary from "@meronex/icons/md/MdPhotoLibrary";
import { getImageSize } from "polotno/utils/image";

const PhotosPanel = observer(({ store }) => {
  const [images, setImages] = useState([]);
  const [selectedTabId, setSelectedTabId] = useState("MT42");

  async function loadImages() {
    // here we should implement your own API requests
    setImages([]);

    // wait to emulate network request
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // for demo images are hard coded
    // in real app here will be something like JSON structure

    const MT42 = [...Array(20)].map((_, index) => {
      const n = index + 1;

      return {
        url: `./tabs/png/MT42/MT42 (${n}).png`,
      };
    });

    const RT42 = [...Array(29)].map((_, index) => {
      const n = index + 1;

      return {
        url: `./tabs/png/RT42/RT42 (${n}).png`,
      };
    });

    const DISPLAYS = [...Array(4)].map((_, index) => {
      const n = index + 1;

      return {
        url: `./tabs/png/DISPLAYS/DISPLAYS (${n}).png`,
      };
    });

    const ENGRAVINGS = [...Array(7)].map((_, index) => {
      const n = index + 1;

      return {
        url: `./tabs/png/ENGRAVINGS/ENGRAVINGS (${n}).png`,
      };
    });

    const OTHERS = [...Array(2)].map((_, index) => {
      const n = index + 1;

      return {
        url: `./tabs/png/OTHERS/OTHERS (${n}).png`,
      };
    });

    const urls = _.concat(MT42, RT42, DISPLAYS, ENGRAVINGS, OTHERS);
    setImages([...urls]);
  }

  useEffect(() => {
    loadImages();
  }, []);

  const handleTabChange = (tabId) => {
    setSelectedTabId(tabId);
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* <InputGroup
        leftIcon="search"
        placeholder="Search..."
        onChange={(e) => {
          loadImages();
        }}
        style={{
          marginBottom: "20px",
        }}
      /> */}

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
        images={_.filter(images, (image) => image.url.includes(selectedTabId))}
        getPreview={(image) => image.url}
        onSelect={async (image, pos, element) => {
          // image - an item from your array
          // pos - relative mouse position on drop. undefined if user just clicked on image
          // element - model from your store if images was dropped on an element.
          //    Can be useful if you want to change some props on existing element instead of creating a new one
          const { width, height } = await getImageSize(image.url);
          store.activePage.addElement({
            type: "image",
            src: image.url,
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
