import React from "react";
import fs from "fs";
import path from "path";
import { observer } from "mobx-react-lite";
import { useInfiniteAPI } from "polotno/utils/use-api";

import { SectionTab } from "polotno/side-panel";
import MdPhotoLibrary from "@meronex/icons/md/MdPhotoLibrary";

import { ImagesGrid } from "polotno/side-panel/images-grid";

export const TemplatesPanel = observer(({ store }) => {
  // load data
  const { data, isLoading } = useInfiniteAPI({
    getAPI: ({ page }) => `templates/page${page}.json`,
  });

  const folder = "templates";
  // const files = fs.readdirSync(folder);
  // for (const file of files) {
  //   // if it is not a json file - skip it
  //   if (file.indexOf(".json") === -1) {
  //     continue;
  //   }

  //   // load file
  //   const data = fs.readFileSync(path.join(folder, file)).toString();
  //   const json = JSON.parse(data);
  //   console.log("========================", data, json);
  // }

  return (
    <div style={{ height: "100%" }}>
      <ImagesGrid
        shadowEnabled={false}
        images={[
          "https://rocketiotparserstorage.blob.core.windows.net/tableau-templates/polotno.json",
        ]}
        getPreview={(item) => `/templates/${item.preview}`}
        isLoading={isLoading}
        onSelect={async (item) => {
          alert();
          // download selected json
          const req = await fetch(
            "https://rocketiotparserstorage.blob.core.windows.net/tableau-templates/polotno.json"
          );
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
