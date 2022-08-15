import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const Nav = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate()
  const handleLogout = () => {
    AuthService.logout();
    window.alert("Logout Successfully, redirect to the homepage now.");
    setCurrentUser(null);
    navigate("/")
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  Home
                </Link>
              </li>
              {!currentUser && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                </>
              )}
              {currentUser && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="" onClick={handleLogout}>
                      Logout
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/course">
                      Course
                    </Link>
                  </li>
                </>
              )}
              {
                currentUser && currentUser.user.role === "instructor" && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/postCourse">
                      Post Course
                    </Link>
                  </li>
                ) 
              }
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
