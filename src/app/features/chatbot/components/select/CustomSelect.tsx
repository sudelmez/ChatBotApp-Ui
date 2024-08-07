import React from 'react';
import Select, { StylesConfig, SingleValue } from 'react-select';
import { Option } from '../../model/option_model';

interface CustomSelectProps {
  values: {
    nextQuestionId: string | null;
    title: string;
    answerId: string;
  }[];
  selectedValue: string | null;
  callback: (answerInputValue:string, nextId: number | null, questionId: string, answerId: string, infoPersonId: string, businessTypeId:number | null, isLastQuestion: boolean) => void;
  questionId: string;
  infoPersonId: string;
  businessTypeId: number | null;
  isLastQuestion: boolean;
  isLasted: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ values, selectedValue, callback, questionId, infoPersonId, businessTypeId ,isLastQuestion, isLasted}) => {
  const customStyles: StylesConfig<Option, false> = {
    control: (provided) => ({
      ...provided,
      // padding: '8px',
      fontSize: '18px',
      borderRadius: '4px',
      color: !isLasted ? '#4a0a9a' : '#a895f5',
      // width: '500px',
      fontFamily: '"Pragati Narrow", sans-serif',
      borderColor: !isLasted ? '#4a0a9a' : '#a895f5',
    }),
    option: (provided) => ({
      ...provided,
      fontSize: '16px',
      color: 'black',
      backgroundColor: 'white',
      fontFamily: '"Pragati Narrow", sans-serif'
    }),
  };

  const handleChange = (selectedOption: SingleValue<Option>) => {
    const selectedAnswerId = selectedOption?.answerId?.toString()?? "";
    const nextQuestionId = selectedOption?.nextQuestionId!==null ? parseInt(selectedOption?.nextQuestionId ?? '') : null;
    callback("", nextQuestionId, questionId, selectedAnswerId, infoPersonId, businessTypeId,isLastQuestion);
  };

  const formattedValues = values.map((value) => ({
    label: value.title,
    answerId: value.answerId,
    nextQuestionId: value.nextQuestionId
  }));

  return (
    <Select 
      className='col-md-12'
      styles={customStyles}
      onChange={handleChange}
      options={formattedValues}
      placeholder="Lütfen bir cevap seçin."
      value={formattedValues.find(option => option.answerId === selectedValue)}
    />
  );
}

export default CustomSelect;
