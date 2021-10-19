import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { SectionTab } from "polotno/side-panel";
import { Button, InputGroup } from "@blueprintjs/core";
import { GiResize } from "react-icons/gi";

const AVAILABLE_SIZES = [
  { width: 100, height: 250 },
  { width: 250, height: 250 },
];

// define the new custom section
const SizesPanel = observer(({ store }) => {
  const [size, setSize] = useState({
    width: 100,
    height: 250,
  });

  useEffect(() => {
    store.setSize(
      parseInt(size.width * 3.7795275591),
      parseInt(size.height * 3.7795275591)
    );
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
        Width(mm)
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
        Height(mm)
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
            store.setSize(width * 3.7795275591, height * 3.7795275591);
          }}
        >
          {`${width}mmx${height}mm`}
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
