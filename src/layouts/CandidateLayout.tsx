
import { ReactNode } from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

interface CandidateLayoutProps {
  children: ReactNode;
}

const CandidateLayout = ({ children }: CandidateLayoutProps) => {
  // Dummy logout function - will be replaced with actual authentication logic
  const handleLogout = () => {
    console.log("Candidate logout");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar 
        role="candidate" 
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

export default CandidateLayout;
