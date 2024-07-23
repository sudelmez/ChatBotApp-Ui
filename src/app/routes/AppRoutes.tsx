import React from 'react';
import ChatBotPage from "../features/chatbot/page/ChatBotPage";
import NotFound from "../features/NotFound/page/NotFound";

const AppRoutes = [
  {
    index: true,
    path: '/',
    element: <ChatBotPage />
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
