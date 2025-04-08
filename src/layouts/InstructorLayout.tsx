
import { ReactNode } from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

interface InstructorLayoutProps {
  children: ReactNode;
}

const InstructorLayout = ({ children }: InstructorLayoutProps) => {
  // Dummy logout function - will be replaced with actual authentication logic
  const handleLogout = () => {
    console.log("Instructor logout");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar 
        role="instructor" 
        isAuthenticated={true} 
        onLogout={handleLogout}
      />
      <main className="flex-1 py-8">
        <div className="assessify-container">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default InstructorLayout;
