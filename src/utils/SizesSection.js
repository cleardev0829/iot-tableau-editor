import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { SectionTab } from "polotno/side-panel";
import { Button, InputGroup } from "@blueprintjs/core";
import { GiResize } from "react-icons/gi";

const AVAILABLE_SIZES = [
  { width: 500, height: 500 },
  { width: 500, height: 1000 },
  { width: 1000, height: 500 },
];

// define the new custom section
const SizesPanel = observer(({ store }) => {
  const [size, setSize] = useState({ width: 1000, height: 1000 });

  useEffect(() => {
    store.setSize(parseInt(size.width), parseInt(size.height));
  }, [store, size]);

  const handleChange = (e) => {
    setSize({ ...size, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        Width
        <InputGroup
          name="width"
          value={size.width}
          onChange={handleChange}
          style={{
            width: "150px",
          }}
        />
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        Height
        <InputGroup
          name="height"
          value={size.height}
          onChange={handleChange}
          style={{
            width: "150px",
          }}
        />
      </div>

      {AVAILABLE_SIZES.map(({ width, height }, i) => (
        <Button
          key={i}
          style={{ width: "100%", marginBottom: "20px" }}
          onClick={() => {
            store.setSize(width, height);
          }}
        >
          {width}x{height}
        </Button>
      ))}
    </div>
  );
});

const SizesSection = {
  name: "sized",
  Tab: (props) => (
    <SectionTab name="Sizes" {...props}>
      <GiResize icon="new-text-box" />
    </SectionTab>
  ),
  Panel: SizesPanel,
};

export default SizesSection;
