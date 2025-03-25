import React, { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Checkbox, Grid } from "@mui/material";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function WidgetMenu({ onWidgetSubmit }) {
  const [isOpen, setIsOpen] = useState(false);
  const [widgetType, setWidgetType] = useState("grid");
  const [objectType, setObjectType] = useState("agent");
  const [isGroupChecked, setIsGroupChecked] = useState(false);
  const [objects, setObjects] = useState("");
  const [metrics, setMetrics] = useState("");

  const { palette } = createTheme();
  const { augmentColor } = palette;
  const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
  const theme = createTheme({
  palette: {
    anger: createColor('#F40B27'),
    apple: createColor('#5DBA40'),
    steelBlue: createColor('#5C76B7'),
    violet: createColor('#BC00A3'),
  },
});

  const handleSubmit = () => {
    const widgetData = { widgetType, objectType, objects, metrics, group: isGroupChecked };
    console.log("📦 Widget soumis :", widgetData);
    onWidgetSubmit(widgetData);
    setIsOpen(false);
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <div style={{ position: "absolute", top: 20, right: 20 }}>
        <Button style={{ backgroundColor: "#67bcbe" }} variant="contained" startIcon={<AddCircleRoundedIcon />} onClick={() => setIsOpen(true)}>
          Add Widget
        </Button>
      </div>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Ajouter un Widget</DialogTitle>
        <DialogContent dividers>
          <FormControl fullWidth>
            <FormLabel>Widget Type:</FormLabel>
            <RadioGroup row value={widgetType} onChange={(e) => setWidgetType(e.target.value)}>
              <FormControlLabel value="grid" control={<Radio />} label="Grid" />
              <FormControlLabel value="pie" control={<Radio />} label="Pie" />
            </RadioGroup>
          </FormControl>

          <FormControl fullWidth>
            <FormLabel>Object Type:</FormLabel>
            <RadioGroup row value={objectType} onChange={(e) => setObjectType(e.target.value)}>
              <FormControlLabel value="agent" control={<Radio />} label="Agent" />
              <FormControlLabel value="queue" control={<Radio />} label="Queue" />
            </RadioGroup>
          </FormControl>

          <TextField label="Objects" value={objects} onChange={(e) => setObjects(e.target.value)} fullWidth margin="normal" />
          <FormControlLabel control={<Checkbox checked={isGroupChecked} onChange={(e) => setIsGroupChecked(e.target.checked)} />} label="Group" />
          <TextField label="Metrics" value={metrics} onChange={(e) => setMetrics(e.target.value)} fullWidth margin="normal" />
        </DialogContent>

        <DialogActions>
          <Button style={{ backgroundColor: "#006680" }} onClick={() => setIsOpen(false)} variant="contained" color="primary">Annuler</Button>
          <Button style={{ backgroundColor: "#67bcbe" }} onClick={handleSubmit} variant="contained" color="primary">Ajouter</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
