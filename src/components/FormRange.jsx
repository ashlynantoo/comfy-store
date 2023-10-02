import { useState } from "react";
import { formatPrice } from "../utils";

const FormRange = ({ label, name, size, price }) => {
  const step = 1000;
  const maxPrice = 100000;
  const [selectedPrice, setSelectedPrice] = useState(price || maxPrice);

  return (
    <div className="form-control">
      <label htmlFor={name} className="label cursor-pointer">
        <span className="label-text capitalize">{label}</span>
        <span>{formatPrice(selectedPrice)}</span>
      </label>
      <input
        type="range"
        name={name}
        min={0}
        max={maxPrice}
        value={selectedPrice}
        onChange={(event) => {
          setSelectedPrice(event.target.value);
        }}
        step={step}
        className={`range range-accent ${size}`}
      />
      <div className="w-full flex justify-between text-sm px-1 mt-2">
        <span>0</span>
        <span>max: {formatPrice(maxPrice)}</span>
      </div>
    </div>
  );
};

export default FormRange;
