'use client';

import React, { createContext, useContext, useState } from 'react';
import PopupError from '@/interface/components/global/popup/main';

type typePopup = 'error' | 'success';

interface popupContextProps {
  openPopup: (message: string, type: typePopup) => void;
}

const PopupContext = createContext<popupContextProps | undefined>(undefined);

interface popupProviderProps {
  children: React.ReactNode;
}

export const PopupProvider: React.FC<popupProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<typePopup>('error');

  const openPopup = (message: string, type: typePopup) => {
    setMessage(message);
    setIsOpen(true);
    setType(type);
  };

  const closePopup = () => {
    setMessage('');
    setIsOpen(false);
  };

  return (
    <PopupContext.Provider value={{ openPopup }}>
      {isOpen && <PopupError type={type} message={message} onClose={closePopup} />}
      {children}
    </PopupContext.Provider>
  );
};

export const usePopup = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error('usepopup must be used within a TicketProvider');
  }

  return context;
};
