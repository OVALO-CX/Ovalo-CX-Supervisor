import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DropZone from "./Components/DropZone";
import WidgetMenu from './Components/WidgetMenu';

const GRID_SIZE = 20;

const snapToGrid = (value) => Math.round(value / GRID_SIZE) * GRID_SIZE;

function Dashboard() {
  const [cards, setCards] = useState([]);
  const [widgets, setWidgets] = useState([]);

  // 🔹 Fonction appelée lorsqu'un Widget est soumis
  const handleWidgetSubmit = (widgetData) => {
    setWidgets((prevWidgets) => [...prevWidgets, widgetData]);
  };

  const moveCard = (id, left, top) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, initialLeft: left, initialTop: top } : card
      )
    );
  };

  const resizeCard = (id, width, height) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, width, height } : card
      )
    );
  };

  const deleteCard = (id) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ padding: "20px" }}>
        <h1>Dashboard</h1>
        <WidgetMenu onWidgetSubmit={handleWidgetSubmit} />
      </div>
      <div>
        <DropZone
          cards={cards}
          moveCard={moveCard}
          resizeCard={resizeCard}
          deleteCard={deleteCard}
          onAddCard={(newCard) => setCards((prev) => [...prev, newCard])}
          widgets={widgets} // 🔥 Passer les widgets soumis à DropZone
        />
      </div>
    </DndProvider>
  );
}

export default Dashboard;
