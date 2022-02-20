import fs from "fs";
import path from "path";
import { createInstance } from "polotno-node";

// we will look for local directory for templates
const folder = "templates";

async function run() {
  // create working instance
  const instance = await createInstance({
    // this is a demo key just for that project
    // (!) please don't use it in your projects
    // to create your own API key please go here: https://polotno.dev/cabinet
    key: "nFA5H9elEytDyPyvKL7T",
  });

  // read all files in the directory
  const files = fs.readdirSync(folder);
  for (const file of files) {
    // if it is not a json file - skip it
    if (file.indexOf(".json") === -1) {
      continue;
    }

    // load file
    const data = fs.readFileSync(path.join(folder, file)).toString();
    const json = JSON.parse(data);

    // convert JSON into image preview
    const imageBase64 = await instance.run(async (json) => {
      store.loadJSON(json);
      await store.waitLoading();
      // set width of previews
      // we usually don't need original size there
      const maxWidth = 200;
      const scale = maxWidth / store.width;
      return await store.toDataURL({ pixelRatio: scale }).split("base64,")[1];
    }, json);

    // save images locally into the same folder
    fs.writeFileSync(
      path.join(folder, file.split(".")[0] + ".png"),
      imageBase64,
      "base64"
    );
    console.log(`Finished ${folder} ${file}`);
  }
  // close instance
  instance.close();
}

run();
