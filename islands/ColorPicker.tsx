import { h } from "preact";
import { useState } from "preact/hooks";

export default function ColorPicker() {
  const [bgColor, setBgColor] = useState("#ffffff");
  const [outlineColor, setOutlineColor] = useState("#000000");

  const handleBgColorChange = (color: string) => {
    setBgColor(color);
    window.dispatchEvent(new CustomEvent("bgColorChange", { detail: color }));
  };

  const handleOutlineColorChange = (color: string) => {
    setOutlineColor(color);
    window.dispatchEvent(new CustomEvent("outlineColorChange", { detail: color }));
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h1 className="text-2xl font-semibold">Color Picker</h1>
      
      <div className="flex items-center gap-4">
        <label className="font-medium">
          Background Color:
          <input
            type="color"
            value={bgColor}
            onChange={(e) => handleBgColorChange(e.currentTarget.value)}
            className="ml-2"
          />
        </label>
        
        <label className="font-medium">
          Outline Color:
          <input
            type="color"
            value={outlineColor}
            onChange={(e) => handleOutlineColorChange(e.currentTarget.value)}
            className="ml-2"
          />
        </label>
      </div>
    </div>
  );
}