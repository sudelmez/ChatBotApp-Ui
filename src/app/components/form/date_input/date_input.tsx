import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import CustomButton from "../button/CustomButton";

interface CustomDateInputProps {
  isLasted: boolean;
  title: string;
  typeDate: number;
  callback: (date: Date | null, typeDate: number) => void;
}

const CustomDateInput: React.FC<CustomDateInputProps> = ({ isLasted, title, typeDate, callback}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [activeButton, setActiveButton] = useState(false);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value ? new Date(e.target.value) : null;
    setSelectedDate(date);
    setActiveButton(!!date);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(e.target.value);
  }

  const handleSubmit = () => {
    if (selectedDate && selectedTime) {
      const [hours, minutes] = selectedTime.split(":").map(Number);
      const combinedDate = new Date(selectedDate);
      combinedDate.setHours(hours, minutes);
      callback(combinedDate, typeDate);
    }
  };

  return (
    <div className="col-md-12">
      <Form.Group controlId="formDateTime" className="mb-3">
        <Form.Label>{title}</Form.Label>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Form.Control 
            type="date" 
            onChange={handleDateChange} 
            style={{
              fontFamily: '"Pragati Narrow", sans-serif', 
              color: !isLasted ? '#4a0a9a' : '#a895f5', 
              fontSize: '18px',
              borderColor: !isLasted ? '#4a0a9a' : '#a895f5', 
              borderWidth: 0.5, 
              borderRadius: '3px', 
              borderStyle: 'solid'
            }} 
          />
          <Form.Control 
            type="time" 
            onChange={handleTimeChange} 
            style={{
              fontFamily: '"Pragati Narrow", sans-serif', 
              color: !isLasted ? '#4a0a9a' : '#a895f5', 
              fontSize: '18px',
              borderColor: !isLasted ? '#4a0a9a' : '#a895f5', 
              borderWidth: 0.5, 
              borderRadius: '3px', 
              borderStyle: 'solid'
            }} 
          />
        </div>
      </Form.Group>
      {activeButton && (
        <CustomButton pressed={false} title="Save" handlePress={handleSubmit} />
      )}
    </div>
  );
}

export default CustomDateInput;
