import React, { useEffect, useState } from "react";
import fs from "fs";
import path from "path";
import _ from "lodash";
import { observer } from "mobx-react-lite";
import { useInfiniteAPI } from "polotno/utils/use-api";

import { SectionTab } from "polotno/side-panel";
import MdPhotoLibrary from "@meronex/icons/md/MdPhotoLibrary";

import { ImagesGrid } from "polotno/side-panel/images-grid";
import { getBlobsInContainer } from "./azure-storage-blob";

export const TemplatesPanel = observer(({ store }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const response = await getBlobsInContainer();
    const jsonFiles = _.filter(response, (item) => item.name.includes(".json"));
    const jsonUrls = _.map(jsonFiles, "blobUrl");
    setData(jsonUrls);
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      setLoading(false);
    }
  }, [data]);

  return (
    <div style={{ height: "100%" }}>
      <ImagesGrid
        shadowEnabled={false}
        images={data}
        getPreview={(item) => {
          return `${item.replace(/\.[^/.]+$/, "")}.png`;
        }}
        isLoading={loading}
        onSelect={async (item) => {
          // download selected json
          const req = await fetch(item);
          const json = await req.json();
          // just inject it into store
          store.loadJSON(json);
        }}
        rowsNumber={2}
      />
    </div>
  );
});

// define the new custom section
const CustomTemplatesSection = {
  name: "custom-templates",
  Tab: (props) => (
    <SectionTab name="Templates" {...props}>
      <MdPhotoLibrary />
    </SectionTab>
  ),
  // we need observer to update component automatically on any store changes
  Panel: TemplatesPanel,
};

export default CustomTemplatesSection;
