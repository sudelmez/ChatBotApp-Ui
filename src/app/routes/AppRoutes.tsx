import React from 'react';
import ChatBotPage from "../features/chatbot/page/ChatBotPage";
import NotFound from "../features/NotFound/page/NotFound";
import LoginPage from '../features/login/page/login_page';

const AppRoutes = [
  {
    index: true,
    path: '/',
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

export default AppRoutes;
