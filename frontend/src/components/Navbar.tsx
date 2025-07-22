import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../hooks/Createcontext";
const Navbar = () => {
  const { authToken, logout } = useContext(AuthContext);

const location = useLocation();
const currentpath = location.pathname;
  const path = [
      {
        path: "/dashboard",
        isActive : false,
        label: "dashboard"
      },
      {
        path: "/courses/add-course",
        isActive : false,
        label: "Add course"
      },
      {
        path: "/courses/history",
        isActive : false,
        label: "history"
      },
  ]
  return (
    <nav className="shadow-md sticky top-0 z-50 bg-black-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex-shrink-0 text-blue-600 font-bold text-xl">
          learnify
        </div>
        <div className="hidden md:flex space-x-32">
          {authToken ? (
           <>
            {
             path.map(({path: itemPath,label}) => {
              const isActive = currentpath === itemPath;
              return (
              <Link
                to={itemPath}
                className={`text-gray-700 hover:text-blue-600 transition ${isActive ? "bg-blue-100 text-white px-5 rounded-lg" : "bg-dark-blue-600 text-white" }`} 
              >
                {label}
              </Link>
              ) 
            })}

            <button onClick={logout} className="text-white px-4" style={{backgroundColor: "white", color: "#1E88E5"}}>
            Logout
          </button>

          <Link
                  to="/instructor/profile"
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  <FontAwesomeIcon icon={faUser} size="lg"/>
                </Link>

            </>
          ) : (
            <>
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                About
              </Link>
              <Link
                to="/users/register"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Sign Up
              </Link>
              <Link
                to="/users/login"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
