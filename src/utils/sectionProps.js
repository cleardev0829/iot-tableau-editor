import //   DEFAULT_SECTIONS,
//   TemplatesSection,
//   TextSection,
//   PhotosSection,
//   ElementsSection,
// UploadSection,
//   BackgroundSection,
//   SizeSection,
"polotno/side-panel";

import CustomSection from "./CustomSection";
import PhotosSection from "./PhotosSection";

export const ToolbarProps = {
  downloadButtonEnabled: false,

  hideTextSpacing: true,
  hideTextEffects: true,

  hideImageFlip: true,
  hideImageEffects: true,
  hideImageCrop: true,
  hideImageFit: true,
  hideBackground: true,

  hidePosition: true,
  hideOpacity: true,
  hideDuplicate: true,
  hideLock: true,
  hideRemove: true,
};

export const SidePanelProps = {
  sections: [CustomSection, PhotosSection],
  defaultSection: "resources",
};

export const WorkspaceProps = {
  backgroundColor: "grey",
  pageBorderColor: "black", // border around page
  activePageBorderColor: "red", // border around active page. It will be used only if you have several pages. Otherwise just pageBorderColor will be used
  pageControlsEnabled: false,
};
