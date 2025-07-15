import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="shadow-md sticky top-0 z-50 bg-black-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex-shrink-0 text-blue-600 font-bold text-xl">
          learnify
        </div>
        <div className="hidden md:flex space-x-32">
          <Link to="/" className="text-gray-700 hover:text-blue-600 transition">Home</Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600 transition">About</Link>
          <Link to="/users/register" className="text-gray-700 hover:text-blue-600 transition">Sign Up</Link>
          <Link to="/users/login" className="text-gray-700 hover:text-blue-600 transition">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
