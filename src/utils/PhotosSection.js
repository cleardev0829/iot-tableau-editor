import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { SectionTab } from "polotno/side-panel";
import { InputGroup } from "@blueprintjs/core";
import { ImagesGrid } from "polotno/side-panel/images-grid";
import MdPhotoLibrary from "@meronex/icons/md/MdPhotoLibrary";
import { getImageSize } from "polotno/utils/image";

export const PhotosPanel = observer(({ store }) => {
  const [images, setImages] = useState([]);

  async function loadImages() {
    // here we should implement your own API requests
    setImages([]);

    // wait to emulate network request
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // for demo images are hard coded
    // in real app here will be something like JSON structure
    setImages([
      { url: "./tabs/Tab-01.svg" },
      { url: "./tabs/Tab-02.svg" },
      { url: "./tabs/Tab-03.svg" },
      { url: "./tabs/Tab-04.svg" },
      { url: "./tabs/Tab-05.svg" },
      { url: "./tabs/Tab-06.svg" },
      { url: "./tabs/Tab-07.svg" },
      { url: "./tabs/Tab-08.svg" },
    ]);
  }

  useEffect(() => {
    loadImages();
  }, []);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <InputGroup
        leftIcon="search"
        placeholder="Search..."
        onChange={(e) => {
          loadImages();
        }}
        style={{
          marginBottom: "20px",
        }}
      />
      <p>Demo images: </p>
      {/* you can create yur own custom component here */}
      {/* but we will use built-in grid component */}
      <ImagesGrid
        images={images}
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
const PhotosSection = {
  name: "resources",
  Tab: (props) => (
    <SectionTab name="Resources" {...props}>
      <MdPhotoLibrary />
    </SectionTab>
  ),
  Panel: PhotosPanel,
};

export default PhotosSection;
