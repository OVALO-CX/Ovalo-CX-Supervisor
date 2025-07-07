import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Typography } from "@mui/material";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#d88484", "#84c2d8", "#ff9999"];

export default function QueuePieChart({ data }) {
  if (!Array.isArray(data) || data.length === 0) {
    return <Typography>Aucune donnée disponible</Typography>;
  }

  const chartData = data.map((queue, index) => ({
    name: queue.name || `Queue ${index + 1}`,
    value: queue.queueUserMemberCount || 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {chartData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
