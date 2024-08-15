import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import CustomButton from "../button/CustomButton";

interface CustomFileInputProps {
  isLasted: boolean;
  title: string;
  callback: (file: File[]) => void;
  typeFile: number;
}

const CustomFileInput: React.FC<CustomFileInputProps> = ({ isLasted, title, callback }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [activeButton, setActiveButton] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setSelectedFiles(prevList => [...prevList, ...fileArray]);
      setActiveButton(true);
    }
  };

  const handleSubmit = () => {
    if (selectedFiles.length > 0) {
      callback(selectedFiles);
    }
  };

  return (
    <div className="col-md-12">
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Control
          type="file"
          onChange={handleFileChange}
          multiple
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
