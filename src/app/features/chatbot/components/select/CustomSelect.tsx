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
  callback: ( autoResponseId: string, answerInputValue:string, nextId: number | null, questionId: string, answerId: string, infoPersonId: string, businessTypeId:number | null, isLastQuestion: boolean) => void;
  questionId: string;
  infoPersonId: string;
  businessTypeId: number | null;
  isLastQuestion: boolean;
  autoResponseId: string;
  isLasted: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ values, selectedValue, callback, questionId, infoPersonId, businessTypeId ,isLastQuestion, isLasted, autoResponseId}) => {
  const customStyles: StylesConfig<Option, false> = {
    placeholder:(provided) => ({
      ...provided,
      color: !isLasted ? '#4a0a9a' : '#a895f5',
    }),
    singleValue:(provided) =>({
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
      fontFamily: '"Pragati Narrow", sans-serif'
    }),
  };

  const handleChange = (selectedOption: SingleValue<Option>) => {
    const selectedAnswerId = selectedOption?.answerId?.toString()?? "";
    const nextQuestionId = selectedOption?.nextQuestionId!==null ? parseInt(selectedOption?.nextQuestionId ?? '') : null;
    callback(autoResponseId,"", nextQuestionId, questionId, selectedAnswerId, infoPersonId, businessTypeId,isLastQuestion);
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
