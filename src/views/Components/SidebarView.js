import React, { useState } from "react";
import LinkIcon from "@mui/icons-material/Link";
import LockIcon from "@mui/icons-material/Lock";
import InputIcon from "@mui/icons-material/Input";
import OutputIcon from "@mui/icons-material/Output";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import PublicIcon from "@mui/icons-material/Public";
import SecurityIcon from "@mui/icons-material/Security";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";

import SidebarController from "../../controllers/SidebarController";

const SidebarView = () => {
  const [collapsed, setCollapsed] = useState(SidebarController.getCollapsed());

  const handleToggle = () => {
    SidebarController.toggleSidebar();
    setCollapsed(SidebarController.getCollapsed());
  };

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : 'expanded'}`}>
      <button className="toggle-button" onClick={handleToggle}>
        {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </button>
      <Sidebar collapsed={collapsed} width={"200px"}>
        <Menu>
          <MenuItem icon={<InputIcon />}>Input</MenuItem>
          <MenuItem icon={<OutputIcon />}>Output</MenuItem>
          <MenuItem icon={<LockIcon />}>Encrypt</MenuItem>
          <MenuItem icon={<LockOpenIcon />}>Decrypt</MenuItem>
          <MenuItem icon={<FingerprintIcon />}>Hash</MenuItem>
          <MenuItem icon={<VpnKeyIcon />}>Seed</MenuItem>
          <MenuItem icon={<PublicIcon />}>Public Key</MenuItem>
          <MenuItem icon={<SecurityIcon />}>Private Key</MenuItem>
          <MenuItem icon={<SwapHorizIcon />}>Xor</MenuItem>
          <MenuItem icon={<LinkIcon />}>Concatenate</MenuItem>
          <MenuItem icon={<ChevronLeftIcon />}>Shift Left</MenuItem>
          <MenuItem icon={<ChevronRightIcon />}>Shift Right</MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SidebarView;
