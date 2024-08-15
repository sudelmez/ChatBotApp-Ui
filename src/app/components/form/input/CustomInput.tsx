import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import * as Yup from 'yup';
import { Formik } from 'formik';
import CustomButton from "../button/CustomButton";
import { ValidationRuleModel } from "../../../features/chatbot/model/validation_rule_model";

interface CustomInputProps {
  callback: (value: string) => void;
  isLasted: boolean;
  validationRule: ValidationRuleModel | null;
  optionId: string;
}

const CustomInput: React.FC<CustomInputProps> = ({ callback, isLasted, validationRule, optionId}) => {
  const [inputVal, setInputVal] = useState(() => {
    const savedValue = localStorage.getItem(`input-value-${optionId}`);
    return savedValue ? savedValue : "";
  });
  const [activeButton, setActiveButton] = useState(false);
  const schema = Yup.string().required("Değer zorunludur.");

  const validationSchema = Yup.object().shape({
    value: validationRule !== null ? schema.matches(new RegExp(validationRule.pattern), validationRule.message) : schema
  });
  
  return (
    <Formik
      initialValues={{ value: inputVal }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        callback(values.value);
        setInputVal(values.value);
        localStorage.setItem(`input-value-${optionId}`, values.value);
      }}
    >
      {({ handleSubmit, handleChange, values, errors, touched, validateForm }) => (
        <div className="col-md-12">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="validationFormik01" className="mb-3">
              <Form.Control
                style={{ fontFamily: '"Pragati Narrow", sans-serif', color: !isLasted ? '#4a0a9a' : '#a895f5', fontSize: '18px', borderColor: !isLasted ? '#4a0a9a' : '#a895f5', borderWidth: 0.5, borderRadius: '3px', borderStyle: 'solid' }}
                required
                type="text"
                name="value"
                value={values.value}
                onChange={(e) => {
                  handleChange(e);
                  setActiveButton(true);
                  setInputVal(e.target.value);
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
