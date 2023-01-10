import React from 'react';
import { Outlet } from 'react-router-dom';

import SideMenu from '../SideMenu';
import Header from '../Header';

const SideLayout = () => {
  return (
    <div
      id="app"
      style={({ height: "100vh" }, { display: "flex", flexDirection: "row" })}
    >
      <SideMenu />
      <main style={({ width: "100%"})}>
        <Header/>
        <Outlet />
      </main>
    </div>
  );
}

export default SideLayout