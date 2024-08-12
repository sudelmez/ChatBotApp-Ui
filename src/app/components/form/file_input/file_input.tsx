import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import CustomButton from "../button/CustomButton";

interface CustomFileInputProps {
  isLasted: boolean;
  title: string;
  callback: (file: File | null) => void;
  typeFile: number
}

const CustomFileInput: React.FC<CustomFileInputProps> = ({ isLasted, title, callback}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [activeButton, setActiveButton]= useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setSelectedFile(file);
    setActiveButton(true);
  };
  const handleSubmit=()=>{
    if(selectedFile){
      callback(selectedFile);
    }}
  return (
    <div className="col-md-12">
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>{title}</Form.Label>
        <Form.Control 
          type="file" 
          onChange={handleFileChange} 
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
      </Form.Group>
      {activeButton && (<CustomButton pressed={false} title="Kaydet" handlePress={handleSubmit} />)}
    </div>
  );
}

export default CustomFileInput;