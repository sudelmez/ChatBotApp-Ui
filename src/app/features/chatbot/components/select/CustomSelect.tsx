import React, { useState, useEffect } from 'react';
import Select, { StylesConfig, SingleValue } from 'react-select';
import { Option } from '../../model/option_model';

interface CustomSelectProps {
  values: {
    nextQuestionId: number | null;
    title: string;
    optionId: string;
    info: string | null;
  }[];
  callback: (
    answerInputValue: string, 
    nextId: number | null, 
    questionId: number, 
    answerId: string, 
    businessTypeId: number | null, 
  ) => void;
  questionId: number;
  businessTypeId: number | null;
  isLasted: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ values, callback, questionId, businessTypeId, isLasted}) => {
  const [svalue, setsValue] = useState<SingleValue<Option>>(() => {
    const savedValue = localStorage.getItem(`selected-option-${questionId}`);
    return savedValue ? JSON.parse(savedValue) : null;
  });

  useEffect(() => {
    if (svalue) {
      localStorage.setItem(`selected-option-${questionId}`, JSON.stringify(svalue));
    }
  }, [svalue, questionId]);

  const customStyles: StylesConfig<Option, false> = {
    placeholder: (provided) => ({
      ...provided,
      color: !isLasted ? '#4a0a9a' : '#a895f5',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: !isLasted ? '#4a0a9a' : '#a895f5',
    }),
    control: (provided) => ({
      ...provided,
      fontSize: '18px',
      borderRadius: '4px',
      color: !isLasted ? '#4a0a9a' : '#a895f5',
      fontFamily: '"Pragati Narrow", sans-serif',
      borderColor: !isLasted ? '#4a0a9a' : '#a895f5',
    }),
    option: (provided) => ({
      ...provided,
      color: !isLasted ? '#4a0a9a' : '#a895f5',
      fontSize: '16px',
      backgroundColor: 'white',
      fontFamily: '"Pragati Narrow", sans-serif',
    }),
  };

  const handleChange = (selectedOption: SingleValue<Option>) => {
    setsValue(selectedOption);
    const selectedAnswerId = selectedOption?.optionId ?? "";
    const nextQuestionId = selectedOption?.nextQuestionId ?? null;
    callback("", nextQuestionId, questionId, selectedAnswerId, businessTypeId);
  };

  const formattedValues = values.map((value) => ({
    label: value.title,
    optionId: value.optionId,
    nextQuestionId: value.nextQuestionId,
  }));

  return (
    <div>
      <Select
        className='col-md-12'
        styles={customStyles}
        onChange={handleChange}
        options={formattedValues}
        placeholder="Lütfen bir cevap seçin."
        value={svalue}
      />
    </div>
  );
}

export default CustomSelect;
