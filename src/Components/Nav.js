import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "./AuthContext";
import UserContext from "./UserContext";
import './Nav.css';

function Nav() {
  const [auth, setAuth] = useContext(AuthContext);
  const [username, setUsername] = useContext(UserContext);

  function logout() {
    localStorage.setItem("_token", "");
    setAuth(false);
    localStorage.setItem("username", "");
    setUsername("");
  }
  return (
    <div className='home-container'>
      <Link to="/"><h1><i className="fas fa-home bg-transparent text-white"></i></h1></Link>
      <h5 className="text-white">{username}</h5>
      {auth 
      ? 
        <div className='nav-container'>
          <div className="nav-item">
            <h1><Link to={`/users/${username}`}><i className="fas fa-wallet bg-transparent text-white"></i></Link></h1>
            <h5 className="text-white">Wallet</h5>
          </div>
          <Link className="bg-transparent text-success nav-item" to="/send"><button className="btn btn-light payment-btn">Send $$</button></Link>
          <div className="nav-item">
            <h1 onClick={logout}><Link to="/"><i className="fas fa-power-off bg-transparent text-white"></i></Link></h1>
            <h5 className="text-white">Logout</h5>
          </div>
        </div>
      : null}
    </div>
  );
}

export default Nav;