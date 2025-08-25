'use client';

import React, { createContext, useContext, useState, useRef } from 'react';
import Popup from '@/interface/components/global/popup/main';
import PopupConcentTerms from '@/interface/components/site/popup-concent-terms/main';

type typePopup = 'error' | 'success';

interface popupContextProps {
  openPopup: (message: string, type: typePopup) => void;
  openConcentTerm: (submit: () => void) => void;
}

const PopupContext = createContext<popupContextProps | undefined>(undefined);

interface popupProviderProps {
  children: React.ReactNode;
}

export const PopupProvider: React.FC<popupProviderProps> = ({ children }) => {
  const submitFunctRef = useRef<() => void>(() => {});
  const [isConcentTerm, setConcentTerm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<typePopup>('error');

  const openPopup = (message: string, type: typePopup) => {
    setMessage(message);
    setIsOpen(true);
    setType(type);
  };

  const openConcentTerm = (submit: () => void) => {
    submitFunctRef.current = submit;
    setIsOpen(true);
    setConcentTerm(true);
  };

  const closePopup = () => {
    setConcentTerm(false);
    setMessage('');
    setIsOpen(false);
  };

  return (
    <PopupContext.Provider value={{ openPopup, openConcentTerm }}>
      {
        isOpen ? 
          isConcentTerm ?
            <PopupConcentTerms submit={submitFunctRef.current} onClose={closePopup}/>
          :
            <Popup type={type} message={message} onClose={closePopup} />
        :
          false
      }
      {children}
    </PopupContext.Provider>
  );
};

export const usePopup = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error('usePopup must be used within a PopupProvider');
  }

  return context;
};
