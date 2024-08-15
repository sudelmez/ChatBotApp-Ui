import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import AppRoutes from './routes/AppRoutes';
import { useUserContext } from './context/user_context';
import { useEffect } from 'react';


function App() {
  const {token} = useUserContext();
  useEffect(()=>{
    console.log(token);
  },[token])
  return (
    <Routes>
      {token !== null || token !== "" ? (<>
        {AppRoutes.AuthorizedAppRoutes.map((route, index) => {
        const { element, ...rest } = route;
        return <Route key={index} {...rest} element={element} />;
      })} 
      </>): (<>
      {
        AppRoutes.NotAuthorizedAppRoutes.map((route, index) => {
          const { element, ...rest } = route;
          return <Route key={index} {...rest} element={element} />;
        })
      }</>)}
    <Route path="*" element={<Navigate to={token ? "/" : "/login"} />} />
    </Routes>
  );
}

export default App;
