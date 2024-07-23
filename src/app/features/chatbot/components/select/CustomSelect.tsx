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
  index: number;
  selectedValue: string | null;
  setSelectedValue: (value: string | null) => void;
  callback: (nextId: number | null, index: number, questionId: string, answerId: string, categoryId: string, infoPersonId: string) => void;
  questionId: string;
  categoryId: string;
  infoPersonId: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ values, selectedValue, setSelectedValue, callback, index, questionId, categoryId, infoPersonId }) => {
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
    const value = selectedOption?.value?.toString() ?? null;
    setSelectedValue(value);
    const nextQuestionId = value ? parseInt(value) : null;
    const answerId = selectedOption?.value ?? '';
    callback(nextQuestionId, index, questionId, answerId, categoryId, infoPersonId);
  };

  const formattedValues = values.map((value) => ({
    value: value.nextQuestionId,
    label: value.title,
  }));

  return (
    <Select
      styles={customStyles}
      onChange={handleChange}
      options={formattedValues}
      placeholder="Lütfen bir cevap seçin."
      value={formattedValues.find(option => option.value === selectedValue)}
    />
  );
}

export default CustomSelect;
