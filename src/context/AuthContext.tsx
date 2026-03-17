import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const PIN_KEY = 'habit-tracker-pin';

interface AuthContextType {
  isAuthenticated: boolean;
  hasPin: boolean;
  setPin: (newPin: string) => void;
  login: (enteredPin: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPinState] = useState<string | null>(null);

  useEffect(() => {
    const storedPin = localStorage.getItem(PIN_KEY);
    if (storedPin) {
      setPinState(storedPin);
    }
  }, []);

  const setPin = (newPin: string) => {
    localStorage.setItem(PIN_KEY, newPin);
    setPinState(newPin);
    setIsAuthenticated(true);
  };

  const login = (enteredPin: string) => {
    if (enteredPin === pin) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    hasPin: !!pin,
    setPin,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
