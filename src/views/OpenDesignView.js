import "../styles/OpenDesignView.css";
import { Rnd } from "react-rnd";
import React, { useEffect, useState } from "react";
import SidebarView from "./Components/SidebarView";
import SidebarController from "../controllers/SidebarController";
import OpenDesignController from "../controllers/OpenDesignController";

const GRID_SIZE = 40;
const SIDEBAR_COLLAPSED_WIDTH = 60;
const SIDEBAR_EXPANDED_WIDTH = 180;

const OpenDesignView = () => {
  const [boxes, setBoxes] = useState(OpenDesignController.getBoxes());
  const [selectedItem, setSelectedItem] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(SidebarController.getCollapsed());
  const [isPanning, setIsPanning] = useState(false);
  const [backgroundPosition, setBackgroundPosition] = useState({ x: 0, y: 0 });
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  const snapToGrid = (x, y) => {
    const snappedX = Math.round(x / GRID_SIZE) * GRID_SIZE;
    const snappedY = Math.round(y / GRID_SIZE) * GRID_SIZE;
    return { x: snappedX, y: snappedY };
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isPanning) {
        const deltaX = e.clientX - panStart.x;
        const deltaY = e.clientY - panStart.y;
        setBackgroundPosition({
          x: backgroundPosition.x + deltaX,
          y: backgroundPosition.y + deltaY,
        });
        setPanStart({ x: e.clientX, y: e.clientY });
      } else {
        const gridPosition = snapToGrid(e.clientX, e.clientY);
        setCursorPosition(gridPosition);
      }
    };

    const handleMouseDown = (e) => {
      if (e.button === 2) { // Right mouse button
        setIsPanning(true);
        setPanStart({ x: e.clientX, y: e.clientY });
      }
    };

    const handleMouseUp = (e) => {
      if (e.button === 2) { // Right mouse button
        setIsPanning(false);
      }
    };

    const handleClick = (e) => {
      if (selectedItem && !isPanning) {
        const gridPosition = snapToGrid(e.clientX, e.clientY);
        const sidebarWidth = sidebarCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_EXPANDED_WIDTH;
        if (gridPosition.x > sidebarWidth) {
          const newBox = {
            name: selectedItem,
            position: gridPosition,
            size: { width: GRID_SIZE * 2, height: GRID_SIZE * 2 }, // Adjust initial size here
          };
          OpenDesignController.addBox(newBox);
          setBoxes(OpenDesignController.getBoxes());
          setSelectedItem(null);
        }
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("click", handleClick);
    };
  }, [selectedItem, sidebarCollapsed, isPanning, backgroundPosition, panStart]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const gridPosition = snapToGrid(e.clientX, e.clientY);
      setCursorPosition(gridPosition);
    };

    const handleClick = (e) => {
      if (selectedItem) {
        const gridPosition = snapToGrid(e.clientX, e.clientY);
        const sidebarCollapsed = SidebarController.getCollapsed();
        const sidebarWidth = sidebarCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_EXPANDED_WIDTH;
        if (gridPosition.x > sidebarWidth) {
          const newBox = {
            name: selectedItem,
            position: gridPosition,
            size: { width: GRID_SIZE * 2, height: GRID_SIZE * 2 },
          };
          OpenDesignController.addBox(newBox);
          setBoxes(OpenDesignController.getBoxes());
          setSelectedItem(null);
        }
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("click", handleClick);
    };
  }, [selectedItem]);

  useEffect(() => {
    const handleSidebarToggle = () => {
      setSidebarCollapsed(SidebarController.getCollapsed());
    };

    document.addEventListener("sidebarToggle", handleSidebarToggle);

    return () => {
      document.removeEventListener("sidebarToggle", handleSidebarToggle);
    };
  }, []);

  const handleDragStop = (index, e, d) => {
    const newPosition = snapToGrid(d.x, d.y);
    OpenDesignController.updateBoxPosition(index, newPosition);
    setBoxes(OpenDesignController.getBoxes());
  };

  const handleResizeStop = (index, e, direction, ref, delta, position) => {
    const snappedWidth = Math.round(ref.offsetWidth / GRID_SIZE) * GRID_SIZE;
    const snappedHeight = Math.round(ref.offsetHeight / GRID_SIZE) * GRID_SIZE;
    const newSize = { width: snappedWidth, height: snappedHeight };
    const newPosition = snapToGrid(position.x, position.y);
    OpenDesignController.updateBoxSize(index, newSize);
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
              <rect
                width={GRID_SIZE * 10}
                height={GRID_SIZE * 10}
                fill="url(#smallGrid)"
              />
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
          <Rnd
            key={index}
            size={{ width: box.size.width, height: box.size.height }}
            position={{ x: box.position.x, y: box.position.y }}
            grid={[GRID_SIZE, GRID_SIZE]}
            onDragStop={(e, d) => handleDragStop(index, e, d)}
            onResizeStop={(e, direction, ref, delta, position) =>
              handleResizeStop(index, e, direction, ref, delta, position)
            }
            minWidth={GRID_SIZE}
            minHeight={GRID_SIZE}
            maxWidth={GRID_SIZE * 10}
            maxHeight={GRID_SIZE * 10}
            className="box"
          >
            <div>{box.name}</div>
          </Rnd>
        ))}
        {selectedItem && (
          <div
            className="box"
            style={{
              left: cursorPosition.x,
              top: cursorPosition.y,
              width: GRID_SIZE * 2,
              height: GRID_SIZE * 2,
              position: "fixed",
              pointerEvents: "none",
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
