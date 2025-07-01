import React, { useEffect, useState, useRef } from "react";
import { useDrop } from "react-dnd";
import DraggableResizableCard from "./ResizableCard";
import GetUserTable from "../UserTable"; // 📌 Import de UserTable si besoin

const GRID_SIZE = 20;

const snapToGrid = (value) => Math.round(value / GRID_SIZE) * GRID_SIZE;

const DropZone = ({ cards, moveCard, resizeCard, deleteCard, onAddCard, onRefresh, onExport, widgets }) => {
  const dropZoneRef = useRef(null);

  // 🔹 Ajout automatique des Widgets soumis par `WidgetMenu`
  /*useEffect(() => {
    widgets.forEach((widget, index) => {

      //const alreadyExists = cards.some((card) => card.data?.id === widget.id);
      const alreadyExists = cards.some(
        (card) => card.data?.id === widget.id);// || card.name === widget.widgetType);
      
      if (!alreadyExists) {
    
      const newCard = {
        //id: cards.length + index + 1,
        //id: Date.now() + index, // Utilisation de Date.now() pour un ID unique                  
        //id: `${widget.widgetType}-${Date.now() + index}`,
        id: `${widget.widgetType}-${widget.id}`, // ID unique basé sur widget
        name: widget.widgetType,
        initialLeft: snapToGrid(50 + index * 50), // Évite de superposer les cartes
        initialTop: snapToGrid(50 + index * 50),
        width: snapToGrid(400),
        height: snapToGrid(250),
        componentName: widget.widgetType,
        data: widget, // 🔥 Ajout des données du widget
      };
      onAddCard(newCard);
    }
    });
  }, [widgets, cards]); // 📌 Réagit aux changements des widgets
*/
  const [, drop] = useDrop({
    accept: "CARD",
    drop: (item, monitor) => {
      const dropOffset = monitor.getSourceClientOffset() || { x: 0, y: 0 };
      const left = snapToGrid(dropOffset.x);
      const top = snapToGrid(dropOffset.y);

      const newCard = {
        //id: cards.length + 1,
        id: `${item.name}-${Date.now()}`, // ID unique
        name: item.name,
        initialLeft: left,
        initialTop: top,
        width: snapToGrid(600),
        height: snapToGrid(400),
        componentName: item.name,
        data: item.data || {},
      };
      onAddCard(newCard);
    },
  });

  return (
    <div
      ref={drop}
      style={{
        position: "relative",
        width: "100%",
        height: "800px",
        borderRadius: "1%",
        backgroundColor: "#F0F0F2",
        padding: "10px",
      }}
    >
      {cards.map((card) => (
        <DraggableResizableCard
          key={card.id}
          {...card}
          id={card.id}
          onMove={moveCard}
          onResize={resizeCard}
          onDelete={deleteCard}
          onRefresh={onRefresh}
          onExport={onExport}
          data={card} // 📌 Les données du widget sont passées ici
        />
      ))}
    </div>
  );
};

export default DropZone;
