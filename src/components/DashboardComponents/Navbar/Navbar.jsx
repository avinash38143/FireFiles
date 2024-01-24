// import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOutUser } from "../../../redux/actionCreators/authActionCreator";
const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm p-2">
      <Link className="navbar-brand ms-5" to="/">
        FireFiles
      </Link>

      <ul className="navbar-nav ms-auto me-5">
        {isAuthenticated ? (
          <>
            <li className="nav-item mx-2 ">
              <p className="my-0 mt-2 mx-2">
                <span className="text-dark">Welcome, </span>
                <span className="text-warning fw-bold ">
                  {" "}
                  {user.displayName}
                </span>
              </p>
            </li>
            <li className="nav-item mx-2">
              <Link to="/" className="btn btn-primary ">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-success "
                onClick={() => {
                  dispatch(signOutUser());
                  navigate("/");
                  window.location.reload();
                }}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item mx-2">
              <Link to="/login" className="btn btn-primary btn-sm ">
                Login
              </Link>
            </li>
            <li className="nav-item ">
              <Link to="/register" className="btn btn-success btn-sm ">
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
