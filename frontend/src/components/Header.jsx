import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { FaLink } from "react-icons/fa6";
import { useLogoutMutation } from "../slices/userApiSlice";
import { clearCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

function Header() {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logout] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logout().unwrap()
      dispatch(clearCredentials())
      navigate('/login')
      toast.success('Logout Successfully')
    } catch (err) {
      console.log(err)
    }
  };
  return (
    <header className="navbar ms-4 me-3 shadow">
      <LinkContainer to="/">
        <a href="/" className="logo">
          <FaLink /> URLshortify
        </a>
      </LinkContainer>
      <div className="buttons">
        {userInfo ? (
          <button onClick={logoutHandler}>Logout</button>
        ) : (
          <LinkContainer to="/register">
            <button>Register</button>
          </LinkContainer>
        )}
      </div>
    </header>
  );
}

export default Header;
