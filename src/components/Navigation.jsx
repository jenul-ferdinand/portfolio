import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Navigation() {
  const [showTitle, setShowTitle] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    if (!isHomePage) {
      setShowTitle(true);
      return;
    }

    // Observe the main heading on home page
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When heading is NOT visible, show nav title
        setShowTitle(!entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: "-80px 0px 0px 0px", // Offset by navbar height
      }
    );

    // Wait for DOM to be ready
    const checkElement = setInterval(() => {
      const heading = document.getElementById("main-heading");
      if (heading) {
        observer.observe(heading);
        clearInterval(checkElement);
      }
    }, 100);

    return () => {
      clearInterval(checkElement);
      observer.disconnect();
    };
  }, [isHomePage]);

  return (
    <nav className="sticky top-0 z-50 border-b border-neutral-800 bg-neutral-950/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Name */}
          <Link
            to="/"
            className={`font-tiempos text-xl text-white transition-all duration-300 hover:text-gray-300 ${
              showTitle ? "opacity-100" : "opacity-0"
            }`}
          >
            Jenul Ferdinand
          </Link>

          {/* Navigation Links */}
          <div className="flex gap-8">
            <Link
              to="/"
              className="font-poppins text-sm text-gray-300 transition-colors hover:text-white"
            >
              Home
            </Link>
            <Link
              to="/projects"
              className="font-poppins text-sm text-gray-300 transition-colors hover:text-white"
            >
              Projects
            </Link>
            <Link
              to="/blog"
              className="font-poppins text-sm text-gray-300 transition-colors hover:text-white"
            >
              Blog
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
