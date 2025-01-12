// VideoContext.tsx
import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
} from "react";
import { useLocation } from "react-router-dom";

// Define types for the context state
interface VideoContextType {
  isInVideoSection: boolean;
}

// Create the context with a default value
const VideoContext = createContext<VideoContextType>({
  isInVideoSection: true,
});

// Custom hook for using the video context
export const useVideoContext = () => {
  const context = useContext(VideoContext);
  if (context === undefined) {
    throw new Error("useVideoContext must be used within a VideoProvider");
  }
  return context;
};

interface VideoProviderProps {
  children: ReactNode;
}

export const VideoProvider: React.FC<VideoProviderProps> = ({ children }) => {
  const location = useLocation();
  const [isInVideoSection, setIsInVideoSection] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY;

      // Get video section height
      const videoSection = document.querySelector(".video-section");

      if (videoSection && location.pathname === "/") {
        const videoHeight = videoSection.getBoundingClientRect().height;
        setIsInVideoSection(currentPosition <= videoHeight);
      } else {
        setIsInVideoSection(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  return (
    <VideoContext.Provider value={{ isInVideoSection }}>
      {children}
    </VideoContext.Provider>
  );
};
