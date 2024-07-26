import React from 'react';
import Select, { StylesConfig, SingleValue } from 'react-select';

interface Option {
  label: string;
  answerId: string;
  nextQuestionId:string | null;
}

interface CustomSelectProps {
  values: {
    nextQuestionId: string | null;
    title: string;
    answerId: string;
  }[];
  index: number;
  selectedValue: string | null;
  callback: (nextId: number | null, questionId: string, answerId: string, infoPersonId: string) => void;
  questionId: string;
  infoPersonId: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ values, selectedValue, callback, questionId, infoPersonId }) => {
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
    const selectedAnswerId = selectedOption?.answerId?.toString() ?? '';
    const nextQuestionId = parseInt(selectedOption?.nextQuestionId ?? '');
    callback(nextQuestionId, questionId, selectedAnswerId, infoPersonId);
  };

  const formattedValues = values.map((value) => ({
    label: value.title,
    answerId: value.answerId,
    nextQuestionId: value.nextQuestionId
  }));

  return (
    <Select
      styles={customStyles}
      onChange={handleChange}
      options={formattedValues}
      placeholder="Lütfen bir cevap seçin."
      value={formattedValues.find(option => option.answerId === selectedValue)}
    />
  );
}

export default CustomSelect;
