import React from 'react';
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../components/form/button/CustomButton";
import "./NotFound.css";

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="NotFound">
      <h1>The page you are trying to access is not allowed!</h1>
      <CustomButton pressed={false} title={"Login"} handlePress={() => { navigate('/login') }}></CustomButton>
    </div>
  );
}

export default NotFound;
