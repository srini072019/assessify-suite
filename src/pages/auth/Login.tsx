
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ROUTES } from "@/constants/routes";
import AuthLayout from "@/layouts/AuthLayout";
import { toast } from "sonner";
import { UserRole } from "@/types/auth.types";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Mock login handler - will be replaced with Supabase auth
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // For demo purposes - simulating different role logins
      // In the real app, this will be handled by authentication logic
      let role: UserRole = "candidate";
      
      if (email.includes("admin")) {
        role = "admin";
      } else if (email.includes("instructor")) {
        role = "instructor";
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Login successful!");
      
      // Redirect based on user role
      switch (role) {
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
          navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Log in to your account" 
      subtitle="Or create a new account"
    >
      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <Label htmlFor="email">Email address</Label>
          <div className="mt-1">
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              to={ROUTES.FORGOT_PASSWORD}
              className="text-sm font-medium text-assessify-primary hover:text-assessify-primary/90"
            >
              Forgot password?
            </Link>
          </div>
          <div className="mt-1">
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center">
          <div className="flex items-center">
            <Checkbox
              id="remember-me"
              checked={rememberMe}
              onCheckedChange={(checked) => 
                setRememberMe(checked === true)
              }
            />
            <Label htmlFor="remember-me" className="ml-2 text-sm">
              Remember me
            </Label>
          </div>
        </div>

        <div>
          <Button
            type="submit"
            className="w-full bg-assessify-primary hover:bg-assessify-primary/90"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link
              to={ROUTES.REGISTER}
              className="font-medium text-assessify-primary hover:text-assessify-primary/90"
            >
              Sign up
            </Link>
          </p>
        </div>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
              Demo Users
            </span>
          </div>
        </div>

        <div className="mt-6 grid gap-2">
          <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
            <p>Admin: admin@example.com / password</p>
            <p>Instructor: instructor@example.com / password</p>
            <p>Candidate: candidate@example.com / password</p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
