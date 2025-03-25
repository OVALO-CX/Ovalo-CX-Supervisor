import { Button, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import WidgetsIcon from "@mui/icons-material/Widgets";
import { useState } from "react";
import { motion } from "framer-motion";

const AddWidgetButton = () => {
  const [hover, setHover] = useState(false);

  return (
<div>
    <Button
      variant="contained"
      color="primary"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      sx={{
        transition: "all 0.3s ease",
        minWidth: "160px", // Taille minimum pour éviter le changement brusque
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        style={{ display: "flex", alignItems: "center", gap: "8px" }}
      >
        {hover ? <WidgetsIcon /> : <AddIcon />}
        <Box component="span">{hover ? "Widget" : "Add Widget"}</Box>
      </motion.div>
    </Button>

    <Button
        size="small"
        variant="contained"
        color="primary"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        startIcon={hover ? <AddIcon /> : <AddIcon />} // Change l'icône
        sx={{
            alignItems: "center",
            justifyContent: "center"
        }}
        >
        {hover ? "Add Widget" : null}
    </Button>
</div>

  );
};

export default AddWidgetButton;
