import Chat from '@/page/chat';
import { createContext, useState } from 'react';
import Consulting from '../consulting';

export const pageController = createContext(null);
export default () => {
  const [chatPage, setChatPage] = useState(false);

  return (
    <pageController.Provider value={setChatPage}>
      {chatPage ? <Chat /> : <Consulting />}
    </pageController.Provider>
  );
};
