import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import * as Yup from 'yup';
import { Formik } from 'formik';
import CustomButton from "../button/CustomButton";

interface CustomInputProps {
  callback: (value: string) => void;
  isLasted: boolean;
  inputValue?: string
}

const CustomInput: React.FC<CustomInputProps> = ({ callback, isLasted, inputValue = ''}) => {
  const [inputVal, setInputVal] = useState("Değer Giriniz");
  const validationSchema = Yup.object().shape({
    value: Yup.string().required("Değer zorunludur."),
  });

  return (
    <Formik
      initialValues={{ value: inputValue }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log("validated and pressed");
        callback(values.value);
      }}
    >
      {({ handleSubmit, handleChange, values, errors, touched }) => (
        <div className="col-md-12" >
        <Form onSubmit={handleSubmit} >
          <Form.Group  controlId="validationFormik01" className="mb-3" >
            <Form.Control 
            style={{fontFamily:'"Pragati Narrow", sans-serif', color:!isLasted ? '#4a0a9a' : '#a895f5', fontSize: '18px',borderColor: !isLasted ? '#4a0a9a' : '#a895f5', borderWidth: 0.5, borderRadius:'3px', borderStyle: 'solid'}}
              required 
              type="text"
              name="value"
              value={values.value}
              onChange={handleChange}
              placeholder="Değer Giriniz"
              isValid={touched.value && !errors.value}
              isInvalid={!!errors.value}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              {errors.value}
            </Form.Control.Feedback>
          </Form.Group>
          <CustomButton pressed={false} title="Kaydet" handlePress={handleSubmit} />
        </Form>
        </div>
        
      )}
    </Formik>
  );
}

export default CustomInput;
