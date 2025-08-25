'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getSettings } from '@/lib/actions/settings.actions';

interface activeStoreContextProps {
  activeStatus: boolean;
  checkStoreStatus: () => Promise<boolean>;
}

const ActiveStoreContext = createContext<activeStoreContextProps | undefined>(undefined);

interface activeStoreProviderProps {
  children: React.ReactNode;
}

export const ActiveStoreProvider: React.FC<activeStoreProviderProps> = ({ children }) => {
  const [activeStatus, setActiveStatus] = useState(false);

  const checkStoreStatus = async () => {
    const response = await getSettings("site_disabled");
    
    if(response?.content?.value == "false"){
        setActiveStatus(false);
        return false;
    }
    setActiveStatus(true);
    return true;
  };

  useEffect(() => {
    checkStoreStatus();
  }, [])

  return (
    <ActiveStoreContext.Provider value={{ activeStatus, checkStoreStatus }}>
      {children}
    </ActiveStoreContext.Provider>
  );
};

export const useActiveStore = () => {
  const context = useContext(ActiveStoreContext);
  if (!context) {
    throw new Error('useActiveStore must be used within a ActiveStoreProvider');
  }

  return context;
};
