import React from "react";
import Alert from 'react-bootstrap/Alert';

interface CustomAlertProps {
  title: string;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ title }) => {
  return (
    <>
      {[
        'primary',
        // 'secondary',
        // 'success',
        // 'danger',
        // 'warning',
        // 'info',
        // 'light',
        // 'dark',
      ].map((variant) => (
        <Alert style={{width: '500px'}} key={variant} variant={variant}>
          {title}
        </Alert>
      ))}
    </>
  );
}

export default CustomAlert;
