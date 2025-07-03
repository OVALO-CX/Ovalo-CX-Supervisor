import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './context/AuthProvider'; // 🔥 Import du contexte d'authentificatio  n
import BasicPie from './Components/PieChart';
import Grid from '@mui/joy/Grid';

function GetUserPie({ onDataReceived }) {
  const { token } = useAuth(); 
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);


 /* useEffect(() => {
    setData1([
      { id: 0, value: 10, label: 'Available', color: 'green' },
      { id: 1, value: 5, label: 'Busy', color: 'orange' },
      { id: 2, value: 2, label: 'Offline', color: 'gray' },
    ]);
  }, []);*/
  

  useEffect(() => {

      if (!token){
        console.warn("❌ Token expiré ou manquant.");
        return;
      }
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://api.mypurecloud.de/api/v2/users?pageSize=200&pageNumber=1&expand=presence,routingStatus',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const users = response.data.entities;

        console.log("📊 Données pieChart (juste apres appel API) :", users);

        // Regroupement par statut de présence
        const countByStatus = (status) =>
          users.filter(user => user.presence?.presenceDefinition?.systemPresence === status).length;

        const pieChartData1 = [
          { id: 0, value: countByStatus('Available'), label: 'Available', color: 'green' },
          { id: 1, value: countByStatus('Busy'), label: 'Busy', color: 'orange' },
          { id: 2, value: countByStatus('Away'), label: 'Away', color: 'yellow' },
          { id: 3, value: countByStatus('Meal'), label: 'Meal', color: 'brown' },
          { id: 4, value: countByStatus('Meeting'), label: 'Meeting', color: 'red' },
          { id: 5, value: countByStatus('Training'), label: 'Training', color: '#0000FF' },
          { id: 6, value: countByStatus('Break'), label: 'Break', color: 'purple' },
          { id: 7, value: countByStatus('Offline'), label: 'Offline', color: 'gray' },
        ];
        console.log("📊 Données pieChart (data1) :", pieChartData1);
        

        setData1(pieChartData1);
        if (onDataReceived) {
          onDataReceived(pieChartData1);
        }   

        const onQueue = users.filter(user => user.routingStatus?.status !== 'OFF_QUEUE').length;
        const offQueue = users.filter(user => user.routingStatus?.status === 'OFF_QUEUE').length;

        setData2([
          { id: 0, value: onQueue, label: 'on' },
          { id: 1, value: offQueue, label: 'off' },
        ]);
      } catch (error) {
        console.error("Erreur lors du chargement des données utilisateur :", error);
      }
    };

    fetchData();
  }, [token]);

  return (
    //<Grid item xs={6} sm={6} md={6}>
      <div>
      {/*<div style={{ display: 'flex', justifyContent: 'center' }}>*/}
        <BasicPie data1={data1} data2={data2} title="User Availability" />
      </div>
    //</Grid>
  );
}

export default GetUserPie;
