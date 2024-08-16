import React from "react";
import Alert from 'react-bootstrap/Alert';

export enum AlertType {
  Success = 'success',
  Warning = 'warning',
  Danger = 'danger',
  Info = 'info',
}
interface CustomAlertProps {
  title: string;
  type?: AlertType;
}
const CustomAlert: React.FC<CustomAlertProps> = ({ title, type = AlertType.Warning }) => {
  return (
        <Alert  style={{marginTop:'10px'}} key={type} variant={type} >
          {title}
        </Alert>
  );
}

export default CustomAlert;