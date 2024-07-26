import React from 'react';
import ChatBotPage from "../features/chatbot/page/ChatBotPage";
import NotFound from "../features/NotFound/page/NotFound";
import LoginPage from '../features/login/page/login_page';

class AppRoutes {
  static AuthorizedAppRoutes = [
    {
      index: true,
      path: '/',
      element: <LoginPage />
    },{
      index: true,
      path: '/login',
      element: <LoginPage />
    },
    {
      path: '/chatbot',
      element: <ChatBotPage />
    },
    {
      path: '/notfound',
      element: <NotFound />
    },
    {
      path: '*',
      element: <NotFound />
    }
  ];
  
  static NotAuthorizedAppRoutes = [
    {
      index: true,
      path:'/',
      element: <LoginPage/>
    },
    {
      path: '*',
      element: <NotFound />
    },{
      index: true,
      path: '/login',
      element: <LoginPage />
    },
    {
      path: 'notfound',
      element: <NotFound />
    },
  ];
}


export default AppRoutes;
