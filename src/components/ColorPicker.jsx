import { CirclePicker } from "react-color";

function ColorPicker({ colors, onChangeComplete }) {

  return (
    <CirclePicker
      colors={colors}
      width={"fit-content"}
      onChangeComplete={onChangeComplete}
    />
  );
}

export default ColorPicker;
