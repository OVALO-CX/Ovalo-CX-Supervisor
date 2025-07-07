import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Card from '@mui/joy/Card';

import { useAuth } from './context/AuthProvider';
import { useNavigate } from 'react-router-dom';

import DropZone from "./Components/DropZone";
import DraggableItem from './Components/DraggableItem';
//import AuthToken from './AuthToken';
import GetUserTable from './UserTable';
import GetUserPie from './UserPie';
import WidgetMenu from './Components/WidgetMenu';

import { HiMiniTableCells } from "react-icons/hi2";
import { FaChartPie } from "react-icons/fa";
import { PiChartBarHorizontalFill } from "react-icons/pi";
import { IoBarChart } from "react-icons/io5";

import { CardContent, Typography, Button } from "@mui/material";


const GRID_SIZE = 20;

const snapToGrid = (value) => Math.round(value / GRID_SIZE) * GRID_SIZE;

// Map components
const componentMap = {
  'User Table': GetUserTable,
  'User PieChart': GetUserPie,
  // Add other mappings 
};

function Dashboard() {


  
  //const [token, setToken] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cards, setCards] = useState([]);

  //const { user, token, logout } = useAuth();
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const [widgets, setWidgets] = useState([]);

  console.log("Token : ", token);

  // Function to receive the token
  /*const handleTokenReceived = ({access_token, token_expiry}) => {
    setToken(access_token);
    setExpiryDate(token_expiry);
  };*/


  const handleDrop = (itemName) => {
    console.log("Item dropped:", itemName);
    setCards((prevCards) => [
      ...prevCards,
      {
        id: prevCards.length + 1,
        name: itemName,
        initialLeft: snapToGrid(50),
        initialTop: snapToGrid(50),
        width: snapToGrid(150),
        height: snapToGrid(100),
        componentName: itemName,
        //data: { token, expiryDate } // Add data here
      }
    ]);
  };

  const retrieveToken = () => {
    localStorage.getItem('token');
  }

  const addCard = (newCard) => {
    setCards((prevCards) => [...prevCards, newCard]);
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

  //fonction pour récuperer les données du widget
  const handleWidgetSubmit = (widgetData) => {
    //console.log("Données du widget recues dans le parent : ", widgetData);
    setWidgets((prevWidgets) => [...prevWidgets, widgetData]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      {/*<AuthToken onTokenReceived={handleTokenReceived} />*/}
      <div>
        {/*<div className="flex justify-center items-center">*/}
        {/*<WidgetMenu onWidgetSubmit={handleWidgetSubmit}/>*/}
        <WidgetMenu onWidgetSubmit={handleDrop}/>
      </div>
    {/* Liste des widgets ajoutés */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
        {widgets.map((widget, index) => (
          <Card key={index} sx={{ width: 400, padding: 2 }}>
            <CardContent>
              <Typography variant="h6">Widget {index + 1}</Typography>
              <Typography variant="body2">Type: {widget.widgetType}</Typography>
              <Typography variant="body2">Object: {widget.objectType}</Typography>
              <Typography variant="body2">Group: {widget.group ? "Oui" : "Non"}</Typography>

              {/* 🔥 Affichage du UserTable à l'intérieur de la Card */}
              <GetUserTable />
            </CardContent>
          </Card>
        ))}
      </div>


      <div>
        <h6>Draggable Items</h6>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <div style={{ marginRight: '2rem' }}>
            <DraggableItem name='User Table' onDrop={handleDrop} selectedIcon={HiMiniTableCells} token={token} />
          </div>
          <div style={{ marginRight: '2rem' }}>
            <DraggableItem name="User PieChart" onDrop={handleDrop} selectedIcon={FaChartPie} token={token}/>
          </div>
          <div style={{ marginRight: '2rem' }}>
            <DraggableItem name="User Data2" onDrop={handleDrop} selectedIcon={PiChartBarHorizontalFill} token={token}/>
          </div>
          <div style={{ marginRight: '2rem' }}>
            <DraggableItem name="User Data3" onDrop={handleDrop} selectedIcon={IoBarChart} token={token}/>
          </div>
        </div>
      </div>
      <div style={{ padding: "20px" }}>

        
      
       <DropZone
          cards={cards}
          moveCard={moveCard}
          resizeCard={resizeCard}
          deleteCard={deleteCard}
          //onAddCard={addCard}
          onAddCard={(newCard) => setCards((prev) => [...prev, newCard])}
          widgets={widgets}
          //onRefresh={handleTokenReceived}
          //onExport={handleTokenReceived}
          token={token}
        />
      </div>
    </DndProvider>
  );
};

export default Dashboard;