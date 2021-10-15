import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { SectionTab } from "polotno/side-panel";
import { InputGroup } from "@blueprintjs/core";
import { ImagesGrid } from "polotno/side-panel/images-grid";
import MdPhotoLibrary from "@meronex/icons/md/MdPhotoLibrary";
import { getImageSize } from "polotno/utils/image";

const PhotosPanel = observer(({ store }) => {
  const [images, setImages] = useState([]);

  async function loadImages() {
    // here we should implement your own API requests
    setImages([]);

    // wait to emulate network request
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // for demo images are hard coded
    // in real app here will be something like JSON structure

    let urls = [...Array(60)].map((_, index) => {
      const n = index + 1;
      return {
        url: `./tabs/Tab (2)-${n < 10 ? "0" + n : n}.svg`,
      };
    });

    setImages([...urls]);
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
