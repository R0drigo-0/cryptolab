import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/Sidebar.module.css";
import MenuIcon from "@mui/icons-material/Menu"; // Import Menu icon from Material Icons

const Sidebar = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };

  const handleClose = () => {
    setCollapsed(true);
  };

  return (
    <>
      <button className={styles.toggleButton} onClick={handleToggle}>
        <MenuIcon />
      </button>
      <div
        className={`${styles.overlay} ${collapsed ? styles.hidden : ""}`}
        onClick={handleClose}
      ></div>
      <div className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>
        <Nav className={`flex-column ${styles.nav}`} style={{marginTop: "3rem"}}>
          <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
          <Nav.Link onClick={() => navigate("/options")}>Options</Nav.Link>
          <Nav.Link onClick={() => navigate("/design")}>Design</Nav.Link>
        </Nav>
      </div>
    </>
  );
};

export default Sidebar;