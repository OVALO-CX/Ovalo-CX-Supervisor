import React, { useRef, useState, useEffect } from "react";
import { useDrag } from "react-dnd";
import { Card, CardContent, Typography } from "@mui/joy";
import { ExportButton, RefreshButton, DeleteButton, ResizeButton } from "./IconButton";
import GetUserTable from "../UserTable";
import GetQueueTable from "../QueueTable";
import GetUserPie from "../UserPie";
//import GetQueuePie from "../GetQueuePie"; // Ajoute-le si tu as un PieChart pour queues

const GRID_SIZE = 20;
const snapToGrid = (value) => Math.round(value / GRID_SIZE) * GRID_SIZE;

const DraggableResizableCard = ({
  id,
  initialLeft,
  initialTop,
  width,
  height,
  onMove,
  onResize,
  onDelete,
  onRefresh,
  onExport,
  data,
  token,
  expiryDate
}) => {
  const [cardWidth, setCardWidth] = useState(width);
  const [cardHeight, setCardHeight] = useState(height);
  const [fontSize, setFontSize] = useState(16);
  const [tableData, setTableData] = useState([]);
  const [zIndex, setZIndex] = useState(1);

  const resizingRef = useRef(false);
  const positionRef = useRef({ left: initialLeft, top: initialTop });

  const [, drag] = useDrag({
    type: "CARD",
    item: { id },
    canDrag: () => !resizingRef.current,
  });

  const handleMouseDownResize = (event) => {
    event.stopPropagation();
    resizingRef.current = true;
    setZIndex(1000);

    const startX = event.clientX;
    const startY = event.clientY;
    const startWidth = cardWidth;
    const startHeight = cardHeight;

    const handleMouseMove = (moveEvent) => {
      const newWidth = snapToGrid(startWidth + moveEvent.clientX - startX);
      const newHeight = snapToGrid(startHeight + moveEvent.clientY - startY);
      setCardWidth(newWidth);
      setCardHeight(newHeight);
      onResize(id, newWidth, newHeight);
    };

    const handleMouseUp = () => {
      resizingRef.current = false;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseDownDrag = (event) => {
    if (resizingRef.current) return;
    event.preventDefault();
    setZIndex(1000);

    const startX = event.clientX;
    const startY = event.clientY;
    const startLeft = positionRef.current.left;
    const startTop = positionRef.current.top;

    const handleMouseMove = (moveEvent) => {
      const newLeft = snapToGrid(startLeft + (moveEvent.clientX - startX));
      const newTop = snapToGrid(startTop + (moveEvent.clientY - startY));
      positionRef.current = { left: newLeft, top: newTop };
      onMove(id, newLeft, newTop);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      setZIndex(2);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleResizeFont = (newFontSize) => {
    setFontSize(newFontSize);
  };

  const handleDataReceived = (receivedData) => {
    setTableData(receivedData);
  };

  useEffect(() => {
    if (zIndex > 1) {
      const timeout = setTimeout(() => setZIndex(1), 1000);
      return () => clearTimeout(timeout);
    }
  }, [zIndex]);

  const renderComponent = () => {
    const { widgetType, objectType } = data?.data || {};

    if (widgetType === "grid") {
      if (objectType === "agent") {
        return (
          <GetUserTable
            data={data}
            token={token}
            expiryDate={expiryDate}
            fontSize={fontSize}
            onDataReceived={handleDataReceived}
          />
        );
      } else if (objectType === "queue") {
        return (
          <GetQueueTable
            data={data}
            token={token}
            expiryDate={expiryDate}
            fontSize={fontSize}
            onDataReceived={handleDataReceived}
          />
        );
      }
    }

    if (widgetType === "pie") {
      if (objectType === "agent") {
        return (
          <GetUserPie
          data={data}
            token={token}
            expiryDate={expiryDate}
            onDataReceived={handleDataReceived}
          />
        );
      } else if (objectType === "queue") {
        return (
          <GetUserPie
          data={data}
            token={token}
            expiryDate={expiryDate}
            onDataReceived={handleDataReceived}
          />
        );
      }
    }

    return <Typography>Aucun contenu disponible</Typography>;
  };

  return (
    <div
      ref={drag}
      onMouseDown={handleMouseDownDrag}
      style={{
        position: "absolute",
        left: positionRef.current.left,
        top: positionRef.current.top,
        width: cardWidth,
        height: cardHeight,
        cursor: "grab",
        zIndex,
      }}
    >
      <Card
        variant="outlined"
        sx={{
          width: "100%",
          height: "100%",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: `${fontSize}px`,
          }}
        >
          <Typography level="h6">
            {data?.name || `Card ${id}`}
          </Typography>

          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "row",
            }}
          >
            {tableData.length > 0 ? (
              <ExportButton data={tableData} />
            ) : (
              <Typography
                level="body2"
                sx={{ fontStyle: "italic", color: "gray", mr: 1 }}
              >
                Chargement...
              </Typography>
            )}
            <RefreshButton onClick={() => onRefresh(id)} />
            <ResizeButton onResize={handleResizeFont} />
            <DeleteButton onClick={() => onDelete(id)} />
          </div>

          <div style={{ width: "100%", paddingBottom: "20px" }}>{renderComponent()}</div>
        </CardContent>

        <div
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            width: "15px",
            height: "15px",
            cursor: "nwse-resize",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            zIndex: 1001,
          }}
          onMouseDown={handleMouseDownResize}
        />
      </Card>
    </div>
  );
};

export default DraggableResizableCard;
