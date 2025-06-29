import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "student" | "admin";
  career: string;
}

interface UserContextType {
  token: string | null;
  user: User | null;
  login: (newToken: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoadingUser: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
    const queryClient = useQueryClient();


  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

 

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    queryClient.removeQueries({queryKey: ['user']});
  };

  const { data: user, isLoading: isLoadingUser, refetch } = useQuery({
    queryKey: ['user', token],
    queryFn: async () => {
      console.log('pene', token)
      if (!token) return null;
      let url = `https://backendsoftware.vercel.app/users/findMyUser/${token}`
      const res = await fetch(url);
      if (!res.ok) throw new Error('No se pudo obtener el usuario');
      const data = await res.json();
      return {
        _id: data._id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        role: data.role,
        career: data.career,
      };
    },
    enabled: !!token, // solo corre si hay token
    retry: false,
  });
   const login = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  refetch();  };

  return (
    <UserContext.Provider value={{ token, user: user as User, login, logout, isAuthenticated: !!token, isLoadingUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe usarse dentro de un UserProvider');
  }
  return context;
};