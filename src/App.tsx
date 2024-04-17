import { useState } from "react";
import Pad from "./components/Pad/Pad";
import "./App.css";
import "@radix-ui/themes/styles.css";
import PadConfigurator from "./components/PadConfigurator";

function App() {
  const [selected, setSelected] = useState<number>(0);
  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gridTemplateRows: "1fr 1fr 1fr 1fr",
          gridGap: "10px",
        }}
      >
        {new Array(16).fill(null).map((_, i) => (
          <Pad
            key={i}
            id={String(i++)}
            configurator={<PadConfigurator id={String(i++)} />}
            editMode={i === selected}
            onClick={() => setSelected(i)}
            onCloseDetail={() => setSelected(0)}
          />
        ))}
      </div>
      <div id="edit"></div>
    </>
  );
}

export default App;
