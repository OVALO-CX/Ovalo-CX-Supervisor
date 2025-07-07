import React, { useRef, useState } from "react";
import { useDrag } from "react-dnd";
import { Card, CardContent, Typography } from "@mui/material";
import GetUserTable from "../UserTable"; // 📌 Importation du UserTable

const DraggableResizableCard = ({ id, name, initialLeft, initialTop, width, height, onMove, onResize, onDelete, data }) => {
  const resizingRef = useRef(false);
  const positionRef = useRef({ left: initialLeft, top: initialTop });

  const [, drag] = useDrag({
    type: "CARD",
    item: { id },
    canDrag: () => !resizingRef.current,
  });

  console.log("ResizableCard : ", data.widgetType);
  return (
    <div
      ref={drag}
      style={{
        position: "absolute",
        left: positionRef.current.left,
        top: positionRef.current.top,
        width,
        height,
        cursor: "grab",
      }}
    >
      <Card variant="outlined" sx={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
        <CardContent>
          <Typography variant="h6">{name}</Typography>

          {/* 📌 Affichage du bon composant selon `componentName` */}
          {data?.data.widgetType === "grid" ? (
            <GetUserTable />
          ) : (
            <Typography>Aucun contenu disponible : {data.widgetType}</Typography>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DraggableResizableCard;
