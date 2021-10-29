import {
  // DEFAULT_SECTIONS,
  // TemplatesSection,
  TextSection,
  // PhotosSection,
  // ElementsSection,
  // UploadSection,
  // BackgroundSection,
  // SizeSection,
} from "polotno/side-panel";
// import { VectorSection } from "../svg-sidepanel";
// import CustomSection from "./CustomSection";
import PhotosSection from "./PhotosSection";
import SizesSection from "./SizesSection";

export const ToolbarProps = {
  downloadButtonEnabled: true,

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
  sections: [
    SizesSection,
    // CustomSection,
    TextSection,
    // ElementsSection,
    PhotosSection,
    // VectorSection,
    // SizeSection,
    // BackgroundSection,
  ],
  defaultSection: "sizes",
};

export const WorkspaceProps = {
  backgroundColor: "grey",
  pageBorderColor: "black", // border around page
  activePageBorderColor: "red", // border around active page. It will be used only if you have several pages. Otherwise just pageBorderColor will be used
  pageControlsEnabled: false,
};
