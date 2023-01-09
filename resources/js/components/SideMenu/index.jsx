import React from 'react'
import { Sidebar, Menu, MenuItem, useProSidebar, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineHome, AiOutlineUsergroupAdd } from "react-icons/ai";
import { BsFillMenuButtonWideFill } from "react-icons/bs"
import {FaGenderless} from 'react-icons/fa'
import styled from 'styled-components';
import styles from "./SideMenu.module.scss"

const StyledSidebar = styled(Sidebar)`
  &>div {

    &::-webkit-scrollbar {
      width: 0;
    }
    
    &::-webkit-scrollbar-track {
      // background-color: rgb(245, 81, 17);
      // background-color: transparent;
      border-radius: 100px;
    }
    
    &::-webkit-scrollbar-thumb {
      border-radius      : 100px;
      background-clip    : content-box;
      // background-color: rgba(255, 255, 255, 0.1);
      background-color   : white;
    }
  }
`

const StyledSubMenu = styled(SubMenu)`
  &:hover {
    background: transparent;
  }
  &>a:hover {
    background: transparent;
  }
  &>div {
    background-color: transparent;
  }
`

const StyledTopMenuItem = styled(MenuItem)`
  &:hover {
    background: rgba(248,249,250,.15);
  }

  &>a:hover {
    background: transparent;
  }

  &:first-child > a{
    height: 70px;
  }
`;

const StyledMenuItem = styled(MenuItem)`
  &:hover {
    background: rgba(248,249,250,.15);
  }

  &>a:hover {
    background: transparent;
  }
`;



const SideMenu = () => {

  const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } = useProSidebar();
  const toggle = () => {
    // toggleSidebar();
    if (toggled) {
      console.log(true);
      collapseSidebar();
    } else {
      console.log(false);
      collapseSidebar();
    }
  };

  return (
    <>
      <StyledSidebar 
        style={{ height: "100vh", color: "#fff"}} 
        customBreakPoint="600px"
        rtl={false}
        // image="/assets/image/bg-sidebar.jpg"
        className={styles.side_menu}
      >
        <Menu>
          <StyledTopMenuItem
            // onClick={() => {
            //   collapseSidebar();
            // }}
            style={{ textAlign: "center" }}
          >
            {" "}
            <h2>Payment</h2>
          </StyledTopMenuItem>
          <StyledSubMenu icon={<AiOutlineHome />} label="Object Management">
            <StyledMenuItem icon={<FaGenderless/>}>List of properties</StyledMenuItem>
            <StyledMenuItem icon={<FaGenderless/>}>Add property</StyledMenuItem>
          </StyledSubMenu>
          <StyledSubMenu icon={<AiOutlineHome />} label="Industry Management">
            <StyledMenuItem icon={<FaGenderless/>}>Supplier list</StyledMenuItem>
            <StyledMenuItem icon={<FaGenderless/>}>Add vendor</StyledMenuItem>
          </StyledSubMenu>
          <StyledSubMenu icon={<AiOutlineHome />} label="Construction Management">
            <StyledMenuItem icon={<FaGenderless/>}>Housing construction list</StyledMenuItem>
            <StyledMenuItem icon={<FaGenderless/>}>Building construction list</StyledMenuItem>
          </StyledSubMenu>
          <StyledSubMenu icon={<AiOutlineHome />} label="Input Management">
            <StyledMenuItem icon={<FaGenderless/>}>Input confirmation</StyledMenuItem>
            <StyledMenuItem icon={<FaGenderless/>}>Payment confirmation</StyledMenuItem>
          </StyledSubMenu>
          <StyledSubMenu icon={<AiOutlineHome />} label="Totalling">
            <StyledMenuItem icon={<FaGenderless/>}>The entire</StyledMenuItem>
            <StyledMenuItem icon={<FaGenderless/>}>A3 per year by construction</StyledMenuItem>
            <StyledMenuItem icon={<FaGenderless/>}>Fortifications do not month A4</StyledMenuItem>
          </StyledSubMenu>
          <StyledMenuItem icon={<AiOutlineHome />}>Zengin format output</StyledMenuItem>
          <StyledMenuItem icon={<BsFillMenuButtonWideFill />}>Setting</StyledMenuItem>
          <StyledMenuItem icon={<AiOutlineUsergroupAdd />} routerLink={<Link to="/users" />}>Users</StyledMenuItem>
        </Menu>
      </StyledSidebar>
    </>
  );
}

export default SideMenu