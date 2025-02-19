import React from "react";
import styles from "./../../../styles/NodeWrapper.module.css";

const NodeWrapper = ({ nodeType, children }) => {
  return (
    <div className={styles.nodeWrapper}>
      <div className={styles.nodeHeader}>{nodeType}</div>
      <div className={styles.nodeContent}>{children}</div>
    </div>
  );
};

export default React.memo(NodeWrapper);