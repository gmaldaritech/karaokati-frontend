// import { createContext, useContext, useState, useEffect } from 'react';
// import { apiClient } from '@/api/apiClient';

// const AuthContext = createContext();

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // Initialize auth state on mount
//   useEffect(() => {
//     checkAuthState();
    
//     // Listen for auth errors from API calls
//     const handleAuthLogout = () => {
//       setUser(null);
//       setIsAuthenticated(false);
//       // Redirect to login if not already there
//       if (window.location.pathname !== '/access') {
//         window.location.href = '/access';
//       }
//     };
    
//     window.addEventListener('auth:logout', handleAuthLogout);
    
//     // Cleanup
//     return () => {
//       window.removeEventListener('auth:logout', handleAuthLogout);
//     };
//   }, []);

//   const checkAuthState = async () => {
//     try {
//       setLoading(true);
      
//       // Check if token exists
//       if (!apiClient.isAuthenticated()) {
//         setIsAuthenticated(false);
//         setUser(null);
//         return;
//       }

//       // Verify token with server
//       const userData = await apiClient.getCurrentDj();
//       setUser(userData);
//       setIsAuthenticated(true);
//     } catch (error) {
//       console.error('Auth check failed:', error);
//       // Token might be invalid or expired
//       apiClient.clearAuth();
//       setIsAuthenticated(false);
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const login = async (credentials) => {
//     try {
//       const response = await apiClient.login(credentials);
//       setUser(response.dj);
//       setIsAuthenticated(true);
//       return response;
//     } catch (error) {
//       console.error('Login failed:', error);
//       throw error;
//     }
//   };

//   const register = async (userData) => {
//   try {
//     const response = await apiClient.register(userData);
    
//     // 🆕 Solo imposta autenticazione se NON richiede verifica
//     if (response.requires_verification) {
//       // NON impostare user e autenticazione
//       setUser(null);
//       setIsAuthenticated(false);
//     } else {
//       // Flusso normale (se non serve verifica)
//       setUser(response.dj);
//       setIsAuthenticated(true);
//     }
    
//     return response;
//   } catch (error) {
//     console.error('Registration failed:', error);
//     throw error;
//   }
// };

//   const logout = async () => {
//   try {
//     await apiClient.logout();
//   } catch (error) {
//     console.error('Logout failed:', error);
//     // Continue with local logout even if server logout fails
//     apiClient.clearAuth();  // Fallback cleanup
//   } finally {
//     // ✅ Usa lo stesso meccanismo dell'auto-logout
//     window.dispatchEvent(new CustomEvent('auth:logout'));
//     }
//   };

//   const updateProfile = async (userData) => {
//     try {
//       const updatedUser = await apiClient.updateCurrentDj(userData);
//       setUser(updatedUser);
//       return updatedUser;
//     } catch (error) {
//       console.error('Profile update failed:', error);
//       throw error;
//     }
//   };

//   const changePassword = async (passwordData) => {
//     try {
//       return await apiClient.changePassword(passwordData);
//     } catch (error) {
//       console.error('Password change failed:', error);
//       throw error;
//     }
//   };

//   const value = {
//     user,
//     loading,
//     isAuthenticated,
//     login,
//     register,
//     logout,
//     updateProfile,
//     changePassword,
//     checkAuthState,
//     setUser,
//     setIsAuthenticated
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;

import { createContext, useContext, useState, useEffect } from 'react';
import { apiClient } from '@/api/apiClient';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize auth state on mount
  useEffect(() => {
    checkAuthState();
    
    // Listen for auth errors from API calls
    const handleAuthLogout = () => {
      setUser(null);
      setIsAuthenticated(false);
      // Redirect to login if not already there
      if (window.location.pathname !== '/access') {
        window.location.href = '/access';
      }
    };
    
    window.addEventListener('auth:logout', handleAuthLogout);
    
    // Cleanup
    return () => {
      window.removeEventListener('auth:logout', handleAuthLogout);
    };
  }, []);

  const checkAuthState = async () => {
    try {
      setLoading(true);
      
      // Check if token exists
      if (!apiClient.isAuthenticated()) {
        setIsAuthenticated(false);
        setUser(null);
        return;
      }

      // Verify token with server
      const userData = await apiClient.getCurrentDj();
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Auth check failed:', error);
      // Token might be invalid or expired
      apiClient.clearAuth();
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setLoading(true);
      const response = await apiClient.login(credentials);
      setUser(response.dj);
      setIsAuthenticated(true);
      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await apiClient.register(userData);
      
      // Solo imposta autenticazione se NON richiede verifica
      if (response.requires_verification) {
        // NON impostare user e autenticazione
        setUser(null);
        setIsAuthenticated(false);
      } else {
        // Flusso normale (se non serve verifica)
        setUser(response.dj);
        setIsAuthenticated(true);
      }
      
      return response;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await apiClient.logout();
    } catch (error) {
      console.error('Logout failed:', error);
      // Continue with local logout even if server logout fails
      apiClient.clearAuth(); // Fallback cleanup
    } finally {
      setLoading(false);
      // Usa lo stesso meccanismo dell'auto-logout
      window.dispatchEvent(new CustomEvent('auth:logout'));
    }
  };

  const updateProfile = async (userData) => {
    try {
      setLoading(true);
      const updatedUser = await apiClient.updateCurrentDj(userData);
      setUser(updatedUser);
      return updatedUser;
    } catch (error) {
      console.error('Profile update failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (passwordData) => {
    try {
      setLoading(true);
      return await apiClient.changePassword(passwordData);
    } catch (error) {
      console.error('Password change failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    checkAuthState,
    setUser,
    setIsAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;