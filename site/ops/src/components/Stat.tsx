import { Box, Card, CardActions, CardContent, Typography } from "@mui/material";
import React, { type ReactNode } from "react";

export default function Stat({
  label,
  value,
  subValue,
  action,
}: {
  label: ReactNode;
  value: ReactNode;
  subValue?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <Card sx={{ width: 150, margin: 1 }}>
      <CardContent>
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
          {label}
        </Typography>
        <Typography variant="h5" component="div">
          {value}
        </Typography>
        {subValue && (
          <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
            {subValue}
          </Typography>
        )}
      </CardContent>
      {action && <CardActions>{action}</CardActions>}
    </Card>
  );
}

export function StatsContainer({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 1,
        justifyContent: "center",
      }}
    >
      {children}
    </Box>
  );
}
