import React from 'react';
import Select, { StylesConfig, SingleValue } from 'react-select';

interface Option {
  value: string | null;
  label: string;
}

interface CustomSelectProps {
  values: {
    nextQuestionId: string | null;
    title: string;
  }[];
  callback: (nextId: number, index: number) => void;
  isDisabled: boolean;
  index: number;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ values, callback, isDisabled, index }) => {
  const customStyles: StylesConfig<Option, false> = {
    control: (provided) => ({
      ...provided,
      padding: '10px',
      fontSize: '16px',
      borderRadius: '4px',
      width: '100%',
    }),
    option: (provided) => ({
      ...provided,
      fontSize: '14px',
      color: 'black',
      backgroundColor: 'white',
    }),
  };

  const handleChange = (selectedOption: SingleValue<Option>) => {
    if (selectedOption) {
      callback(parseInt(selectedOption.value || '-1'), index);
    }
  };

  const formattedValues = values.map((value) => ({
    value: value.nextQuestionId,
    label: value.title,
  }));

  return (
    <Select
      isDisabled={isDisabled}
      styles={customStyles}
      onChange={handleChange}
      options={formattedValues}
      placeholder="Lütfen bir cevap seçin."
    />
  );
}

export default CustomSelect;
