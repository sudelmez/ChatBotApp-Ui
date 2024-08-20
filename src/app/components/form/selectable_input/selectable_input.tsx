import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import * as Yup from 'yup';
import { Formik } from 'formik';
import CustomButton from "../button/CustomButton";
import { ValidationRuleModel } from "../../../features/chatbot/model/validation_rule_model";
import ToggleButton from 'react-bootstrap/ToggleButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

interface SelectableInputProps {
  callback: (value: string , optionInfo : { title: string; nextQuestionId: number | null; optionId: string; info: string | null; businessTypeId : number | null}) => void;
  isLasted: boolean;
  validationRule: ValidationRuleModel[] | null;
  optionId: string;
  isSelectable?: boolean;
  optionvalues: { title: string; nextQuestionId: number | null; optionId: string; info: string | null; businessTypeId : number | null}[]
}

const SelectableInput: React.FC<SelectableInputProps> = ({ callback, isLasted, validationRule, optionId, isSelectable = false, optionvalues }) => {
  const [radioValue, setRadioValue] = useState(optionvalues[0]?.optionId || '');
  const [selInputValue, setSelInputValue] = useState(optionvalues[0]?.title || '');
  const [val, setVal] = useState<ValidationRuleModel | null>(validationRule?.find((v) => v.businessTypeId?.toString() === optionvalues[0]?.businessTypeId?.toString()) || null);
  const [inputVal, setInputVal] = useState("");
  const [activeButton, setActiveButton] = useState(false);
  const schema = Yup.string().required("Değer zorunludur.");
  const validationSchema = Yup.object().shape({
    value: validationRule !== null
      ? Yup.string().matches(new RegExp(val?.pattern ?? ''), val?.message ?? 'Geçersiz değer.')
      : schema
  });

  return (
    <Formik
      initialValues={{ value: inputVal }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        const selectedOption = optionvalues.find(option => option.optionId.toString() === radioValue.toString());
        if (selectedOption) {
          callback(values.value, selectedOption);
        }
        setInputVal(values.value);
        setActiveButton(false);
        localStorage.setItem(`input-value-${optionId}`, values.value);
      }}>
      {({ handleSubmit, handleChange, values, errors, touched, validateForm }) => (
        <div className="col-md-12" style={{zIndex:"0"}}>
          <ButtonGroup className="col-md-12">
            {optionvalues.map((item, idx) => (
              <ToggleButton 
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant={radioValue === item.optionId ? 'outline-success' : 'outline-danger'}
                name="radio"
                value={item.optionId}
                checked={radioValue === item.optionId}
                onChange={(e) => {
                  const selectedOption = optionvalues.find((v) => v.optionId.toString() === e.currentTarget.value.toString());
                  if (selectedOption) {
                    setRadioValue(e.currentTarget.value);
                    setSelInputValue(selectedOption.title);
                    const valRule = validationRule?.find((v) => v.businessTypeId?.toString() === selectedOption.businessTypeId?.toString()) || null;
                    setVal(valRule);
                  }
                }}
                style={{
                  backgroundColor: radioValue.toString() === item.optionId.toString() ? !isLasted ? '#4a0a9a' : '#a895f5' : '#f8f9fa', 
                  color: radioValue.toString() === item.optionId.toString() ? '#ffffff' : !isLasted ? '#4a0a9a' : '#a895f5', 
                  borderTopLeftRadius: idx === 0 ? '10px' : '0',
                  borderBottomLeftRadius: idx === 0 ? '10px' : '0',
                  borderTopRightRadius: idx === optionvalues.length - 1 ? '10px' : '0',
                  borderBottomRightRadius: idx === optionvalues.length - 1 ? '10px' : '0',
                  borderColor: !isLasted ? '#4a0a9a' : '#a895f5'
                }}
              >
                {item.title}
              </ToggleButton>
            ))}
          </ButtonGroup>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="validationFormik01" className="mb-3">
              <Form.Control
                style={{
                  fontFamily: '"Pragati Narrow", sans-serif',
                  color: !isLasted ? '#4a0a9a' : '#a895f5',
                  fontSize: '18px',
                  borderColor: !isLasted ? '#4a0a9a' : '#a895f5',
                  borderWidth: 0.5,
                  borderRadius: '3px',
                  borderStyle: 'solid'
                }}
                required
                type={val?.inputType?.toString() ?? "text"}
                name="value"
                value={values.value} 
                onChange={(e) => {
                  handleChange(e);
                  setActiveButton(true);
                  setInputVal(e.target.value);
                  validateForm();
                }}
                placeholder={selInputValue || "Değer Giriniz"}
                isValid={touched.value && !errors.value}
                isInvalid={!!errors.value}
              />
              <Form.Control.Feedback type="valid">Yanıtınız başarıyla kaydedildi!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">{errors.value}</Form.Control.Feedback>
            </Form.Group>
            {activeButton && (
              <CustomButton pressed={false} title="Kaydet" handlePress={handleSubmit} />
            )}
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default SelectableInput;
