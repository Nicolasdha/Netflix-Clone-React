import React, { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import CardGiftcardOutlinedIcon from "@material-ui/icons/CardGiftcardOutlined";
import NotificationsIcon from "@material-ui/icons/Notifications";
import TocIcon from "@material-ui/icons/Toc";
import "../styles/Navbar.css";

function Navbar() {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", () => {
        if (window.scrollY > 100) {
          handleShow(true);
        } else {
          handleShow(false);
        }
      });
    };
  }, []);
  return (
    <div className={`nav ${show && "nav__black"}`}>
      <div className='nav__left'>
        <img
          className='nav__logo'
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png'
          alt='Netflix Logo'
        />
        <p className='nav__left--item'>Home</p>
        <p className='nav__left--item'>TV Shows</p>
        <p className='nav__left--item'>Movies</p>
        <p className='nav__left--item'>New & Popular</p>
        <p className='nav__left--item'>My List</p>
      </div>
      <div className='nav__right'>
        <SearchIcon className='nav__right--item' />
        <p className='nav__right--item'>KIDS</p>
        <p className='nav__right--item'>DVD</p>
        <CardGiftcardOutlinedIcon className='nav__right--item' />
        <NotificationsIcon className='nav__right--item' />
        <img
          className='nav__avatar'
          src='https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png'
          alt='Avatar'
        />
        <TocIcon className='nav__right--item' />
      </div>
    </div>
  );
}

export default Navbar;
