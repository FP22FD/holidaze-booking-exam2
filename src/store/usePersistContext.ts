import { useContext } from 'react';
import { PersistContext } from './PersistContext';

export const usePersistContext = () => {
  const context = useContext(PersistContext);
  if (!context) {
    throw new Error('usePersistContext must be used within a PersistProvider');
  }
  return context;
};
