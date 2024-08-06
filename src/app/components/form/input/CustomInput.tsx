import React from "react";
import Form from 'react-bootstrap/Form';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Col from 'react-bootstrap/Col';

interface CustomInputProps {
  callback: (value: string) => void;
}

const CustomInput: React.FC<CustomInputProps> = ({ callback }) => {
  const validationSchema = Yup.object().shape({
    value: Yup.string().required("Kullanıcı adı zorunludur."),
  });

  return (
    <Formik
      initialValues={{ value: '' }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log("validated and pressed")
        callback(values.value);
      }}
    >
      {({ handleSubmit, handleChange, values, errors, touched }) => (
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Col} md="6" controlId="validationFormik01">
              <Form.Control 
                required style={{ width: '500px' }}
                type="text"
                name="value"
                value={values.value}
                onChange={handleChange}
                placeholder="Değer Giriniz"
                isValid={touched.value && !errors.value}
                isInvalid={!!errors.value}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
        </Form>
      )}
    </Formik>
  );
}

export default CustomInput;