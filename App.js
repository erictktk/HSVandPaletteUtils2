import {ShowColors, PaletteCard} from "./SolidColor";
import { RandomSolidColor } from "./PaletteFunctions/RandomSolidColor";
import "./styles.css";

export default function App() {
  const colors = RandomSolidColor();
  return (
    <div className="App">
      <PaletteCard colors={colors}/>
    </div>
  );
}
