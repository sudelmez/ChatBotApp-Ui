import React, {useState} from 'react';
import Select, { StylesConfig, SingleValue } from 'react-select';
import { Option } from '../../model/option_model';
import Form from 'react-bootstrap/Form';

interface CustomSelectProps {
  values: {
    nextQuestionId: number | null;
    title: string;
    optionId: string;
    info: string | null;
  }[];
  selectedValue: string | null;
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

const CustomSelect: React.FC<CustomSelectProps> = ({ values, selectedValue, callback, questionId, businessTypeId, isLasted}) => {
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
  const [value, setValue] = useState('');
  const handleChange = (selectedOption: SingleValue<Option>) => {
    const selectedAnswerId = selectedOption?.optionId ?? "";
    const nextQuestionId = selectedOption?.nextQuestionId ?? null;
    console.log(selectedAnswerId);
    console.log(nextQuestionId);
    callback("", nextQuestionId, questionId, selectedAnswerId,  businessTypeId);
  };

  const formattedValues = values.map((value) => ({
    label: value.title,
    optionId: value.optionId,
    nextQuestionId: value.nextQuestionId,
  }));

  return (
    <div>
       <Form.Control
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type to filter..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        /><Select 
        className='col-md-12'
        styles={customStyles}
        onChange={handleChange}
        options={formattedValues}
        placeholder="Lütfen bir cevap seçin."
        value={formattedValues.find(option => option.optionId === selectedValue)}
      />
    </div>
    
  );
}

export default CustomSelect;
