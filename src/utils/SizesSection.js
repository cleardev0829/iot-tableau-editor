import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { SectionTab } from "polotno/side-panel";
import { Button, InputGroup } from "@blueprintjs/core";
import { GiResize } from "react-icons/gi";

const rateDown = 34 / 483;
const rateUp = 483 / 34;

const AVAILABLE_SIZES = [
  // { width: 1932, height: 1932 },
];

// define the new custom section
const SizesPanel = observer(({ store }) => {
  const [size, setSize] = useState({
    width: store.width,
    height: store.height,
  });

  console.log(store.width, store.height);
  useEffect(() => {
    store.setSize(parseFloat(size.width), parseFloat(size.height));
  }, [store, size]);

  const handleChange = (e) => {
    setSize({ ...size, [e.target.name]: e.target.value * rateUp });
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
        Width(mm)
        <InputGroup
          name="width"
          value={size.width * rateDown}
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
        Height(mm)
        <InputGroup
          name="height"
          value={size.height * rateDown}
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
          {`${width}mmx${height}mm`}
        </Button>
      ))}
    </div>
  );
});

const SizesSection = {
  name: "sizes",
  Tab: (props) => (
    <SectionTab name="Sizes" {...props}>
      <GiResize icon="new-text-box" />
    </SectionTab>
  ),
  Panel: SizesPanel,
};

export default SizesSection;
