import React, { useEffect, useState } from "react";
import _ from "lodash";
import { observer } from "mobx-react-lite";
import { SectionTab } from "polotno/side-panel";
import MdPhotoLibrary from "@meronex/icons/md/MdPhotoLibrary";
import { ImagesGrid } from "polotno/side-panel/images-grid";
import axios from "axios";
import { API_URL } from "./utils";

export const TemplatesPanel = observer(({ store }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    const response = await axios.post(`${API_URL}/azure/getBlobsInContainer `, {
      containerName: "tableau-templates",
    });
    const data = await response.data;
    const jsonFiles = _.filter(data, (item) => item.name.includes(".json"));
    const jsonUrls = _.map(jsonFiles, "blobUrl");
    setData(jsonUrls);
    setLoading(false);
  };

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
