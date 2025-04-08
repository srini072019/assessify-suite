
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { User, UserRole, AuthState } from "@/types/auth.types";
import { ROUTES } from "@/constants/routes";

// Define the shape of our context
interface AuthContextProps {
  authState: AuthState;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
}

// Create the context
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Sample users for demonstration (will be replaced with Supabase)
const dummyUsers = [
  {
    id: "admin-1",
    email: "admin@example.com",
    password: "password123",
    displayName: "Admin User",
    role: "admin" as UserRole,
    createdAt: new Date(),
  },
  {
    id: "instructor-1",
    email: "instructor@example.com",
    password: "password123",
    displayName: "Instructor User",
    role: "instructor" as UserRole,
    createdAt: new Date(),
  },
  {
    id: "candidate-1",
    email: "candidate@example.com",
    password: "password123",
    displayName: "Candidate User",
    role: "candidate" as UserRole,
    createdAt: new Date(),
  },
];

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In the future, this will check with Supabase
        const storedUser = localStorage.getItem("assessify_user");
        
        if (storedUser) {
          const user = JSON.parse(storedUser) as User;
          setAuthState({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    };
    
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    // This will be replaced with Supabase auth
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = dummyUsers.find(u => u.email === email && u.password === password);
      
      if (!user) {
        throw new Error("Invalid credentials");
      }
      
      // Remove password from user object before storing
      const { password: _, ...userWithoutPassword } = user;
      const authenticatedUser: User = userWithoutPassword;
      
      // Store in local storage (temporary solution)
      localStorage.setItem("assessify_user", JSON.stringify(authenticatedUser));
      
      setAuthState({
        user: authenticatedUser,
        isAuthenticated: true,
        isLoading: false,
      });
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${authenticatedUser.displayName}!`,
      });
      
      // Navigate to the appropriate dashboard based on role
      switch (authenticatedUser.role) {
        case "admin":
          navigate(ROUTES.ADMIN_DASHBOARD);
          break;
        case "instructor":
          navigate(ROUTES.INSTRUCTOR_DASHBOARD);
          break;
        case "candidate":
          navigate(ROUTES.CANDIDATE_DASHBOARD);
          break;
        default:
          navigate(ROUTES.HOME);
      }
    } catch (error) {
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
      
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    }
  };

  const register = async (email: string, password: string, displayName: string, role: UserRole) => {
    // This will be replaced with Supabase auth
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      if (dummyUsers.some(u => u.email === email)) {
        throw new Error("User with this email already exists");
      }
      
      // Create new user (in real app, this would be stored in Supabase)
      const newUser: User = {
        id: `user-${Date.now()}`,
        email,
        displayName,
        role,
        createdAt: new Date(),
      };
      
      // Store in local storage (temporary solution)
      localStorage.setItem("assessify_user", JSON.stringify(newUser));
      
      setAuthState({
        user: newUser,
        isAuthenticated: true,
        isLoading: false,
      });
      
      toast({
        title: "Registration successful",
        description: `Welcome to Assessify, ${newUser.displayName}!`,
      });
      
      // Navigate to dashboard based on role
      switch (newUser.role) {
        case "admin":
          navigate(ROUTES.ADMIN_DASHBOARD);
          break;
        case "instructor":
          navigate(ROUTES.INSTRUCTOR_DASHBOARD);
          break;
        case "candidate":
          navigate(ROUTES.CANDIDATE_DASHBOARD);
          break;
        default:
          navigate(ROUTES.HOME);
      }
    } catch (error) {
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
      
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("assessify_user");
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
    navigate(ROUTES.HOME);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const forgotPassword = async (email: string) => {
    // This will be replaced with Supabase auth
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user exists
      const user = dummyUsers.find(u => u.email === email);
      if (!user) {
        throw new Error("No user found with this email");
      }
      
      // In a real application, this would send a password reset email
      toast({
        title: "Password reset email sent",
        description: `If ${email} is associated with an account, you will receive password reset instructions.`,
      });
      
      navigate(ROUTES.LOGIN);
    } catch (error) {
      toast({
        title: "Password reset failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        login,
        register,
        logout,
        forgotPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
