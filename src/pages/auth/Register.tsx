
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AuthLayout from "@/layouts/AuthLayout";
import { ROUTES } from "@/constants/routes";
import { UserRole } from "@/types/auth.types";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("candidate");
  const [isLoading, setIsLoading] = useState(false);

  // Mock signup handler - will be replaced with Supabase auth
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Registration successful! Please log in.");
      navigate(ROUTES.LOGIN);
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Create an account" 
      subtitle="Or sign in to your account"
    >
      <form onSubmit={handleSignup} className="space-y-6">
        <div>
          <Label htmlFor="name">Full name</Label>
          <div className="mt-1">
            <Input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

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
          <Label htmlFor="password">Password</Label>
          <div className="mt-1">
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Password must be at least 8 characters
          </p>
        </div>

        <div>
          <Label htmlFor="role">I am a</Label>
          <Select
            value={role}
            onValueChange={(value) => setRole(value as UserRole)}
          >
            <SelectTrigger id="role" className="mt-1">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="candidate">Student / Candidate</SelectItem>
              <SelectItem value="instructor">Teacher / Instructor</SelectItem>
              <SelectItem value="admin">Administrator</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Button
            type="submit"
            className="w-full bg-assessify-primary hover:bg-assessify-primary/90"
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to={ROUTES.LOGIN}
              className="font-medium text-assessify-primary hover:text-assessify-primary/90"
            >
              Sign in
            </Link>
          </p>
        </div>
      </form>

      <div className="mt-6 text-xs text-center text-gray-500 dark:text-gray-400">
        By signing up, you agree to our{" "}
        <Link to={ROUTES.TERMS} className="text-assessify-primary hover:underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link to="#" className="text-assessify-primary hover:underline">
          Privacy Policy
        </Link>
      </div>
    </AuthLayout>
  );
};

export default Register;
