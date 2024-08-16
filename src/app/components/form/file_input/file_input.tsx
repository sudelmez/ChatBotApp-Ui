import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import CustomButton from "../button/CustomButton";

interface CustomFileInputProps {
  isLasted: boolean;
  callback: (file: File[]) => void;
  optionId:  string
}

const CustomFileInput: React.FC<CustomFileInputProps> = ({ isLasted, callback, optionId }) => {
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
      setActiveButton(false);
      setSelectedFiles([]);
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
      {activeButton && (<CustomButton pressed={false} title="Kaydet" handlePress={handleSubmit}/>)}
    </div>
  );
}

export default CustomFileInput;


// import React, { useState } from "react";
// import Form from 'react-bootstrap/Form';
// import CustomButton from "../button/CustomButton";
// import { Formik } from "formik";
// import * as Yup from 'yup';
// import { ValidationRuleModel } from "../../../features/chatbot/model/validation_rule_model";

// interface CustomFileInputProps {
//   isLasted: boolean;
//   validationRule: ValidationRuleModel | null;
//   callback: (file: File[]) => void;
//   optionId:  string
// }

// const CustomFileInput: React.FC<CustomFileInputProps> = ({ isLasted, callback, validationRule, optionId }) => {
//   const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
//   const [activeButton, setActiveButton] = useState(false);
//   const schema = Yup.string().required("Değer zorunludur.");

//   const validationSchema = Yup.object().shape({
//     value: validationRule !== null ? schema.matches(new RegExp(validationRule.pattern), validationRule.message) : schema
//   });
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (files) {
//       const fileArray = Array.from(files);
//       setSelectedFiles(prevList => [...prevList, ...fileArray]);
//       setActiveButton(true);
//     }
//   };

//   const handleSubmit = () => {
//     if (selectedFiles.length > 0) {
//       callback(selectedFiles);
//       setActiveButton(false);
//       setSelectedFiles([]);
//     }
//   };

//   return (
//     <Formik  
//     initialValues={{ value: selectedFiles }}
//     validationSchema={validationSchema}
//     onSubmit={handleSubmit}>
//     {({ handleSubmit, handleChange, errors, touched, validateForm }) =>(
//       <div className="col-md-12">
//       <Form.Group controlId="formFile" className="mb-3">
//         <Form.Control
//           type="file"
//           onChange={(e)=>{
//               validateForm();
//               handleChange(e);
//             }}
//           multiple
//           isValid={touched.value && !errors.value}
//           style={{
//             fontFamily: '"Pragati Narrow", sans-serif',
//             color: !isLasted ? '#4a0a9a' : '#a895f5',
//             fontSize: '18px',
//             borderColor: !isLasted ? '#4a0a9a' : '#a895f5',
//             borderWidth: 0.5,
//             borderRadius: '3px',
//             borderStyle: 'solid'
//           }}
//         />
//         <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
//       </Form.Group>
//       {activeButton && (<CustomButton pressed={false} title="Kaydet" handlePress={handleSubmit}/>)}
//     </div>)}
//     </Formik>
//   );
// }

// export default CustomFileInput;
