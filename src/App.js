import React from "react";
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from "polotno";
import { Toolbar } from "polotno/toolbar/toolbar";
import { ZoomButtons } from "polotno/toolbar/zoom-buttons";
import { SidePanel } from "polotno/side-panel";
import { Workspace } from "polotno/canvas/workspace";
import { loadFile } from "./file";
import { unstable_setRemoveBackgroundEnabled } from "polotno/config";
import Topbar from "./topbar";

// customization
import {
  ToolbarProps,
  SidePanelProps,
  WorkspaceProps,
} from "./utils/sectionProps";

unstable_setRemoveBackgroundEnabled(false); // hide Remove background

const useHeight = () => {
  const [height, setHeight] = React.useState(window.innerHeight);
  React.useEffect(() => {
    window.addEventListener("resize", () => {
      setHeight(window.innerHeight);
    });
  }, []);
  return height;
};

function clearLog() {
  console.clear();
  setTimeout(clearLog, 1000);
}

const App = ({ store }) => {
  clearLog();

  const handleDrop = (ev) => {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (let i = 0; i < ev.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (ev.dataTransfer.items[i].kind === "file") {
          const file = ev.dataTransfer.items[i].getAsFile();
          loadFile(file, store);
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (let i = 0; i < ev.dataTransfer.files.length; i++) {
        loadFile(ev.dataTransfer.files[i], store);
      }
    }
  };

  const height = useHeight();

  return (
    <div
      style={{
        width: "100vw",
        height: height + "px",
        display: "flex",
        flexDirection: "column",
      }}
      onDrop={handleDrop}
    >
      <Topbar store={store} />
      <div style={{ height: "calc(100% - 50px)" }}>
        <PolotnoContainer className="polotno-app-container">
          <SidePanelWrap>
            <SidePanel store={store} {...SidePanelProps} />
          </SidePanelWrap>
          <WorkspaceWrap>
            <Toolbar store={store} {...ToolbarProps} />
            <Workspace store={store} {...WorkspaceProps} />
            <ZoomButtons store={store} />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: 200,
                height: 30,
                backgroundColor: "grey",
              }}
            />
          </WorkspaceWrap>
        </PolotnoContainer>
      </div>
    </div>
  );
};

export default App;
