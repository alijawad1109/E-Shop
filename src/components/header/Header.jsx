import React, { useEffect, useState } from "react";
import "./style.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { auth } from "../../firebase/Config";
import {onAuthStateChanged, signOut} from 'firebase/auth'
import { FaUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from "../../redux/slice/authSlice";
import {ShowOnLogin,  ShowOnLogout } from "../hiddenLinks/HiddenLink";


const logo = (
  <div className="logo">
    <Link to="/">
      <h2>
        Aj<span>Styles</span>
      </h2>
    </Link>
  </div>
);
const cart = (
  <span className="cart">
    <Link to="/cart">
      Cart
      <FaCartShopping size={20} />
      <p>0</p>
    </Link>
  </span>
);
const activeLinks =(
  ({isActive})=> (isActive ? "active" : "")
)
const Header = () => {
  const navigate =useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setDisplayName] = useState('');

  const dispatch =useDispatch();

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user)
        // const uid = user.uid;
        if(user.displayName == null){
          const u1=user.email.slice(0,-10) 
          const uName =u1.charAt(0).toUpperCase() + u1.slice(1)
          setDisplayName(uName)
        }else{
          setDisplayName(user.displayName)
        }
       dispatch(SET_ACTIVE_USER({
        email:user.email,
        userName:user.displayName ? user.displayName : displayName,
        userID:user.uid,
       }))
      } else {
        setDisplayName("")
        dispatch(REMOVE_ACTIVE_USER())
      }
    });
    
  },[dispatch,displayName])

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const hidemenu = () => {
    setShowMenu(false);
  };
  const logoutUser = () => {
    signOut(auth).then(() => {
      toast.success("Logout Successfully")
      navigate('/')
    }).catch((error) => {
      toast.error(error.message)
    });
    
  }
  return (
    <header>
      <div className="header">
        {logo}
        <nav className={showMenu ? "show-nav" : "hide-nav"}>
          <div className={showMenu ? "nav-wrapper show-nav-wrapper" : "nav-wrapper" } onClick={hidemenu}>
          </div>
            <ul onClick={hidemenu}>
            <li className="logo-mobile">
            {logo}
            <FaTimes size={20} color="#fff"onClick={hidemenu} />
              </li>
              <li>
                <NavLink to="/" className={activeLinks}>Home</NavLink>
              </li>
              <li>
                <Link to="/contact"  className={activeLinks}>Contact us</Link>
              </li>
            </ul>
            <div className="header-right" onClick={hidemenu}>
              <span className="links">
              <ShowOnLogout>
                <NavLink to="/login">
                Login
                </NavLink>
              </ShowOnLogout>
                <ShowOnLogin>
                <a href="#home" style={{color:"#ff7722"}}><FaUserCircle size={20} color="#ff7722" />Hi,  {displayName}</a>
                <NavLink to="/order-history" >My Orders</NavLink>
                <NavLink to="/" onClick={logoutUser}>Logout</NavLink>
                </ShowOnLogin>
              </span>
              {cart}
            </div>
        </nav>
        <div className="menu-icon">
          {cart}
          <GiHamburgerMenu size={28} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;
