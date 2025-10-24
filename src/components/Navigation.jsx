import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="sticky top-0 z-50 border-b border-neutral-800 bg-neutral-950/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Name */}
          <Link
            to="/"
            className="font-tiempos text-xl text-white transition-colors hover:text-gray-300"
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
