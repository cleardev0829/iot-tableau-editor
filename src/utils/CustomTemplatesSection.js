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
  // load data
  // const { data, isLoading } = useInfiniteAPI({
  //   getAPI: ({ page }) => `templates/page${page}.json`,
  // });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const response = await getBlobsInContainer();
    const blobUrls = _.map(response, "blobUrl");

    setData(blobUrls);
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
        getPreview={(item) =>
          `https://rocketiotparserstorage.blob.core.windows.net/tableau-templates/polotno.json`
        }
        isLoading={loading}
        onSelect={async (item) => {
          // download selected json
          const req = await fetch(item);
          const json = await req.json();
          // just inject it into store
          store.loadJSON(json);
        }}
        rowsNumber={1}
      />
    </div>
  );
});

// define the new custom section
const CustomTemplatesSection = {
  name: "custom-templates",
  Tab: (props) => (
    <SectionTab name="Custom templates" {...props}>
      <MdPhotoLibrary />
    </SectionTab>
  ),
  // we need observer to update component automatically on any store changes
  Panel: TemplatesPanel,
};

export default CustomTemplatesSection;
