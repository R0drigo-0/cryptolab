import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
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
import SidebarController from "../controllers/SidebarController";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import OpenDesignController from "../controllers/OpenDesignController";
import "../styles/SidebarView.css";

const SidebarView = ({ onNewNode, selectedNodes, onNodesChange }) => {
  const [collapsed, setCollapsed] = useState(SidebarController.getCollapsed());

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };

  const handleSelectItem = (item) => {
    onNewNode(item);
  };

  const handleRemoveSelectedNodes = () => {
    selectedNodes.forEach(node => {
      OpenDesignController.removeNode(node.id);
    });
    onNodesChange((nds) => nds.filter(node => !selectedNodes.some(selectedNode => selectedNode.id === node.id)));
  };

  return (
    <div className={`sidebar-container ${collapsed ? "collapsed" : "expanded"}`}>
      <button className="toggle-button" onClick={handleToggle}>
        {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </button>
      <Sidebar className="sidebar" collapsed={collapsed} width={"200px"} height="100vh">
        <Menu height="100vh">
          <div className="menu-items">
            <MenuItem icon={<InputIcon />} onClick={() => handleSelectItem("Input")}>
              Input
            </MenuItem>
            <MenuItem icon={<OutputIcon />} onClick={() => handleSelectItem("Output")}>
              Output
            </MenuItem>
            <MenuItem icon={<LockIcon />} onClick={() => handleSelectItem("Encrypt")}>
              Encrypt
            </MenuItem>
            <MenuItem icon={<LockOpenIcon />} onClick={() => handleSelectItem("Decrypt")}>
              Decrypt
            </MenuItem>
            <MenuItem icon={<FingerprintIcon />} onClick={() => handleSelectItem("Hash")}>
              Hash
            </MenuItem>
            <MenuItem icon={<VpnKeyIcon />} onClick={() => handleSelectItem("Seed")}>
              Seed
            </MenuItem>
            <MenuItem icon={<PublicIcon />} onClick={() => handleSelectItem("Public Key")}>
              Public Key
            </MenuItem>
            <MenuItem icon={<SecurityIcon />} onClick={() => handleSelectItem("Private Key")}>
              Private Key
            </MenuItem>
            <MenuItem icon={<SwapHorizIcon />} onClick={() => handleSelectItem("Xor")}>
              Xor
            </MenuItem>
            <MenuItem icon={<LinkIcon />} onClick={() => handleSelectItem("Concatenate")}>
              Concatenate
            </MenuItem>
          </div>
          <div className="delete-button-container">
            <MenuItem className="delete-button" icon={<DeleteRoundedIcon />} onClick={handleRemoveSelectedNodes}>
              Delete
            </MenuItem>
          </div>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SidebarView;