import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { useProSidebar } from 'react-pro-sidebar';
import { AiOutlineMenu } from "react-icons/ai";
import { SlLock, SlUser, SlLogout } from "react-icons/sl";

import styles from './Header.module.scss';

import {
  logout
} from '../../actions/auth'
const Header = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const auth = useSelector(state => state.auth)
  const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } = useProSidebar()

  const [showUserBox, setShowUserBox] = useState(false)

  const toggle = () => {
    toggleSidebar();
    if (toggled) {
      console.log(true);
      collapseSidebar();
    } else {
      console.log(false);
      collapseSidebar();
    }
  };

  const logout = () => {
    localStorage.removeItem('token')
    dispatch(logout())
    navigate('/')
  }

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <button className={styles.toggle_btn} onClick={() => toggle()}><AiOutlineMenu/></button>
      </div>
      <div className={styles.right}>
        <button className={styles.user_btn} onClick={() => setShowUserBox((old) => !old)}>{auth.currentUser.uid}</button>
        {
          showUserBox && 
          <>
            <div className={styles.user_box}>
              <div className={styles.user_data_container}>
                <div className={styles.user_fullname}>{auth.currentUser.first_name + ' ' + auth.currentUser.last_name}</div>
                <div className={styles.user_uid}>{auth.currentUser.uid}</div>
              </div>
              <div className={styles.edit_btn_group}>
                <Link className={styles.profile_btn} to={'/profile'}><SlLock /> Profile</Link>
                <Link className={styles.profile_btn} to={'/profile'}><SlUser /> Change Password</Link>
              </div>
              <div className={styles.logout_btn_container}>
                <button className={styles.logout_btn} onClick={() => logout()}><SlLogout /> Logout</button>
              </div>
            </div>
            {/* <div className={styles.close_panel} onClick={() => setShowUserBox(false)}></div> */}
          </>
        }
      </div>
    </div>
  );
}

export default Header