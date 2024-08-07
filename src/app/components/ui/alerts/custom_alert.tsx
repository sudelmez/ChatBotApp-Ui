import React from "react";
import Alert from 'react-bootstrap/Alert';

interface CustomAlertProps {
  title: string;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ title }) => {
  return (
    <>
      {[
        // 'primary',
        // 'secondary',
        // 'success',
        // 'danger',
        'warning',
        // 'info',
        // 'light',
        // 'dark',
      ].map((variant) => (
        <div className="col-md-12">
        <Alert  style={{marginTop:'10px'}} key={variant} variant={variant} >
          {title}
        </Alert>
        </div>
      ))}
    </>
  );
}

export default CustomAlert;
