import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import * as Yup from 'yup';
import { Formik } from 'formik';
import CustomButton from "../button/CustomButton";
import { ValidationRuleModel } from "../../../features/chatbot/model/validation_rule_model";

interface CustomInputProps {
  callback: (value: string) => void;
  isLasted: boolean;
  inputValue?: string;
  typeInput: number;
  validationRule: ValidationRuleModel | null;
}

const CustomInput: React.FC<CustomInputProps> = ({ callback, isLasted, inputValue = '', validationRule}) => {
  const [inputVal, setInputVal] = useState("Değer Giriniz");
  const [activeButton, setActiveButton]= useState(false);
  const schema = Yup.string().required("Değer zorunludur.");

  const validationSchema = Yup.object().shape({
    value: validationRule!==null ? schema.matches(new RegExp(validationRule.pattern), validationRule.message) : schema
  });

  return (
    <Formik
      initialValues={{ value: inputValue }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        callback(values.value);
      }}>
      {({ handleSubmit, handleChange, values, errors, touched, validateForm }) => (
        <div className="col-md-12" >
        <Form onSubmit={handleSubmit} >
          <Form.Group  controlId="validationFormik01" className="mb-3" >
            <Form.Control 
            style={{fontFamily:'"Pragati Narrow", sans-serif', color:!isLasted ? '#4a0a9a' : '#a895f5', fontSize: '18px',borderColor: !isLasted ? '#4a0a9a' : '#a895f5', borderWidth: 0.5, borderRadius:'3px', borderStyle: 'solid'}}
              required 
              type="text"
              name="value"
              value={values.value}
              onChange={(e) => {
                handleChange(e);
                setActiveButton(true);
                validateForm();
              }}
              placeholder="Değer Giriniz"
              isValid={touched.value && !errors.value}
              isInvalid={!!errors.value}
            />
            <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              {errors.value}
            </Form.Control.Feedback>
          </Form.Group>
         {activeButton && (<CustomButton pressed={false} title="Kaydet" handlePress={handleSubmit} />)}
        </Form>
        </div>
        
      )}
    </Formik>
  );
}

export default CustomInput;