import "../styles/OpenDesignView.css";

import React, { useEffect, useState } from "react";
import SidebarView from "./Components/SidebarView";
import SidebarController from "../controllers/SidebarController";
import OpenDesignController from "../controllers/OpenDesignController";

const GRID_SIZE = 10; // Define the size of the grid

const OpenDesignView = () => {
  const [boxes, setBoxes] = useState(OpenDesignController.getBoxes());
  const [selectedItem, setSelectedItem] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const snapToGrid = (x, y) => {
    const snappedX = Math.round(x / GRID_SIZE) * GRID_SIZE;
    const snappedY = Math.round(y / GRID_SIZE) * GRID_SIZE;
    return { x: snappedX, y: snappedY };
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      const gridPosition = snapToGrid(e.clientX, e.clientY);
      setCursorPosition(gridPosition);
    };

    const handleClick = (e) => {
      if (selectedItem) {
        const gridPosition = snapToGrid(e.clientX, e.clientY);
        const newBox = {
          name: selectedItem,
          position: gridPosition
        };
        OpenDesignController.addBox(newBox);
        setBoxes(OpenDesignController.getBoxes());
        setSelectedItem(null); 
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("click", handleClick);
    };
  }, [selectedItem]);

  const handleDragEnd = (index, e) => {
    const newPosition = snapToGrid(e.clientX, e.clientY);
    OpenDesignController.updateBoxPosition(index, newPosition);
    setBoxes(OpenDesignController.getBoxes());
  };

  useEffect(() => {
    const selectedItem = SidebarController.getSelectedItem();
    setSelectedItem(selectedItem);
  }, [SidebarController.getSelectedItem()]);

  return (
    <div>
      <SidebarView />
      <div className="grid-bg">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="smallGrid"
              width={GRID_SIZE}
              height={GRID_SIZE}
              patternUnits="userSpaceOnUse"
            >
              <path
                d={`M ${GRID_SIZE} 0 L 0 0 0 ${GRID_SIZE}`}
                fill="none"
                stroke="gray"
                strokeWidth="0.5"
              />
            </pattern>
            <pattern
              id="grid"
              width={GRID_SIZE * 10}
              height={GRID_SIZE * 10}
              patternUnits="userSpaceOnUse"
            >
              <rect width={GRID_SIZE * 10} height={GRID_SIZE * 10} fill="url(#smallGrid)" />
              <path
                d={`M ${GRID_SIZE * 10} 0 L 0 0 0 ${GRID_SIZE * 10}`}
                fill="none"
                stroke="gray"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        {boxes.map((box, index) => (
          <div
            key={index}
            className="box"
            style={{
              left: box.position.x,
              top: box.position.y,
              width: GRID_SIZE,
              height: GRID_SIZE
            }}
            draggable
            onDragEnd={(e) => handleDragEnd(index, e)}
          >
            {box.name}
          </div>
        ))}
        {selectedItem && (
          <div
            className="box"
            style={{
              left: cursorPosition.x,
              top: cursorPosition.y,
              width: GRID_SIZE,
              height: GRID_SIZE,
              position: "fixed",
              pointerEvents: "none"
            }}
          >
            {selectedItem}
          </div>
        )}
      </div>
    </div>
  );
};

export default OpenDesignView;