import CustomButton from '../../../components/form/button/CustomButton';
import CustomInput from '../../../components/form/input/CustomInput';
import { LoginRequestModel } from '../model/login_request_model';
import LoginService from '../services/login_service';
import './login_page.css';
import { useState } from 'react';
import { useUserContext } from "../../../context/user_context";
import { useNavigate } from 'react-router-dom';

function LoginPage(){
    const { setToken } = useUserContext();
    const navigate = useNavigate();
    const [username, setUsername]=useState<string>("");
    const [password, setPassword]=useState<string>("");
    const service = new LoginService();
    const handleCallBackUsername=(val: string) => {
        setUsername(val);
    }
    const handleCallBackPassword=(val: string) => {
        setPassword(val);
    }
    const handlePress=async()=>{        
        const data: LoginRequestModel = {
            username: username,
            password:password
          };
          
        console.log(data);
        var response=await service.Login(data);
        const token = response.token; 
        if (token) {
            setToken(token);
            navigate('/chatbot');
        }
        console.log("login response");
        console.log(response);
    }
return(
    <div className='Page'>
    <div className='loginContainer'>
       <div className='customInputDiv'>
        <h3>Username</h3>
        <CustomInput title='Username' index={1} callback={(val) => handleCallBackUsername(val)}></CustomInput></div> 
        <div className='customInputDiv'>
        <h3>Password</h3>
        <CustomInput title='Password' index={1} callback={(val) => handleCallBackPassword(val)}></CustomInput></div> 
        <CustomButton handlePress={()=>handlePress()} title='Login'></CustomButton>
    </div>
    </div>
    );
}
export default LoginPage;