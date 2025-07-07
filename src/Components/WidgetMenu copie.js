import React, { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Checkbox, Grid } from "@mui/material";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import AddWidgetButton from "./AddWidgetButton";

export default function WidgetMenu({ onWidgetSubmit , widgetData}) {
  const [isOpen, setIsOpen] = useState(false);
  const [widgetType, setWidgetType] = useState("pie");
  const [objectType, setObjectType] = useState("agent");
  const [isGroupChecked, setIsGroupChecked] = useState(false);
  const [objects, setObjects] = useState("");
  const [metrics, setMetrics] = useState("");


  const handleSubmitWidgetConf =() => {
    const widgetData = { widgetType, objectType, objects, metrics, group: isGroupChecked};
    console.log("Données du widget : ", widgetData);
    onWidgetSubmit(widgetData);
    setIsOpen(false);
  };
  
  // <div style={{ position: "relative", width: "100%", height: "100vh" }}>

  return (
    <div style={{ position: "relative", width: "100%" }}>
      {/* Bouton Add Widget */}
      <div style={{ position: "absolute", top: 20, right: 20 }}>
        <Button size="small" variant="contained" color="primary" startIcon={<AddCircleRoundedIcon />} 
        /*sx={{ "&:hover::after": { content: '"Click to Add"', }, "&::after": { content: <AddCircleRoundedIcon />, },}}*/
         onClick={() => setIsOpen(true)}>Add Widget
        </Button>
        
        {/*<AddWidgetButton onClick={() => setIsOpen(true)} />*/}
      </div>

      {/* Modal pour ajouter un widget */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontSize: 16 }}>Ajouter un Widget</DialogTitle>
        <DialogContent dividers sx={{ padding: 2 }}>
          {/* Widget Type */}
          <FormControl component="fieldset" fullWidth size="small" margin="normal" sx={{ mb: 1 }}>
            <FormLabel component="legend" sx={{ fontSize: 14 }} >Widget Type:</FormLabel>
            <RadioGroup row value={widgetType} onChange={(e) => setWidgetType(e.target.value)} size="small" sx={{ fontSize: 14 }} >
              <FormControlLabel value="grid" control={<Radio size="small"/>} label="Grid" size="small" sx={{ fontSize: 14 }} />
              <FormControlLabel value="pie" control={<Radio size="small"/>} label="Pie" />
              <FormControlLabel value="histo" control={<Radio size="small"/>} label="Histo" />
              <FormControlLabel value="courbe" control={<Radio size="small"/>} label="Courbe" />
            </RadioGroup>
          </FormControl>

          {/* Object Type */}
          <FormControl component="fieldset" fullWidth size="small" margin="normal" sx={{ mb: 1 }}>
            <FormLabel component="legend" sx={{ fontSize: 14 }} >Object Type:</FormLabel>
            <RadioGroup row value={objectType} onChange={(e) => setObjectType(e.target.value)}>
              <FormControlLabel value="agent" control={<Radio size="small"/>} label="Agent" />
              <FormControlLabel value="queue" control={<Radio size="small"/>} label="Queue" />
            </RadioGroup>
          </FormControl>

          {/* Objects et Group */}

          <Grid container spacing={1} alignItems="center">
            <Grid item xs={10}>
                <TextField label="Objects" value={objects} onChange={(e) => setObjects(e.target.value)} fullWidth size="small" margin="normal" />
            </Grid>
          <Grid item xs={2} style={{ display: "flex", alignItems: "center" }}>
              <FormControlLabel
                control={<Checkbox size="small" checked={isGroupChecked} onChange={(e) => setIsGroupChecked(e.target.checked)} />}
                label="Group"
              />
            </Grid>
                 </Grid>

          {/* Metrics */}
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={10}>
                <TextField label="Metric" value={metrics} onChange={(e) => setMetrics(e.target.value)} fullWidth size="small" margin="normal" />
            </Grid>
          </Grid>
        </DialogContent>

        {/* Boutons du modal */}
        <DialogActions>
          <Button onClick={() => setIsOpen(false)} size="small" color="secondary">Annuler</Button>
          <Button onClick={handleSubmitWidgetConf} size="small" variant="contained" color="primary">Ajouter</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
