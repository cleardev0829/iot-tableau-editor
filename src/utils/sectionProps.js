import {
  // DEFAULT_SECTIONS,
  TemplatesSection,
  TextSection,
  PhotosSection,
  // ElementsSection,
  UploadSection,
  // BackgroundSection,
  SizeSection,
} from "polotno/side-panel";
// import { VectorSection } from "../svg-sidepanel";
import CustomUploadSection from "./CustomUploadSection";
import CustomTemplatesSection from "./CustomTemplatesSection";
import CustomPhotosSection from "./CustomPhotosSection";
import CustomSizesSection from "./CustomSizesSection";

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
  sections: [
    // SizeSection,
    // PhotosSection,
    // UploadSection,
    // ElementsSection,
    // VectorSection,
    // SizeSection,
    // BackgroundSection,
    // TemplatesSection,
    // CustomUploadSection,
    // CustomTemplatesSection,
    CustomSizesSection,
    TextSection,
    // CustomPhotosSection,
  ],
  defaultSection: "sizes",
};

export const WorkspaceProps = {
  backgroundColor: "grey",
  pageBorderColor: "black", // border around page
  activePageBorderColor: "red", // border around active page. It will be used only if you have several pages. Otherwise just pageBorderColor will be used
  pageControlsEnabled: false,
};
