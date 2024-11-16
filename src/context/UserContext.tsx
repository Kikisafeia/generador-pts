import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, Procedure } from '../types';

interface UserContextType {
  user: User | null;
  procedures: Procedure[];
  updateTokens: (used: number) => void;
  addProcedure: (procedure: Procedure) => void;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      id: crypto.randomUUID(),
      tokensRemaining: 10000,
      completedProcedures: 0,
      level: 1,
    };
  });
  
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  const updateTokens = (used: number) => {
    if (user) {
      setUser({
        ...user,
        tokensRemaining: Math.max(0, user.tokensRemaining - used),
        completedProcedures: user.completedProcedures + 1,
        level: Math.floor(user.completedProcedures / 5) + 1,
      });
    }
  };

  const addProcedure = (procedure: Procedure) => {
    setProcedures(prev => [procedure, ...prev]);
  };

  return (
    <UserContext.Provider value={{ user, procedures, updateTokens, addProcedure, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}