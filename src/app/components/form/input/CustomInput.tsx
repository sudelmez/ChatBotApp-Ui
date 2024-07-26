import React, { useState } from "react";

interface CustomInputProps {
  title: string;
  callback: (value: string, index: number) => void;
  index: number;
}

const CustomInput: React.FC<CustomInputProps> = ({ title, callback, index  }) => {
  const [inputVal, setInputVal] = useState<string>("");

  const inputStyle: React.CSSProperties = {
    padding: '15px', 
    fontSize: '16px', 
    borderRadius: '4px', 
    width: '95%'
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputVal(value);
    callback(value, index);
  };

  return (
    <div>
      <input 
        style={inputStyle} 
        title={title} 
        value={inputVal} 
        onChange={handleChange}
      />
    </div>
  );
}

export default CustomInput;
