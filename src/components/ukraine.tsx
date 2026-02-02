import { Close } from "@mui/icons-material";
import { Card, CardActionArea, CardContent, IconButton, Typography, SnackbarContent, useTheme, Box } from "@mui/material";
import { useState, useCallback } from "react";

export default function Ukraine() {
  const theme = useTheme();
  const [hidden, setHidden] = useState(false);

  const onClickClose = useCallback(() => {
    setHidden(true);
  }, [setHidden]);

  if (hidden) {
    return null;
  }

  return (
    <SnackbarContent elevation={0} sx={{
      padding: 0,
      background: "transparent",
      "& .MuiSnackbarContent-message": {
        padding: 0,
        background: "transparent",
      },
      [theme.breakpoints.down('md')]: {
        display: "none",
      },
    }} message={
      <Card
        sx={{
          whiteSpace: "normal",
          position: "relative",
        }}
      >
        <CardActionArea
          href="https://war.ukraine.ua/support-ukraine/"
          target="_blank"
        >
          <CardContent sx={{ padding: 2 }}>
            <Typography noWrap={false} variant="body2" sx={{
              marginBottom: 1,
            }}>
              <Box component="span" color="primary.main">ORBIX</Box>.software stands in solidarity with the Ukrainian people against the Russian invasion.
            </Typography>
            <Typography color="textSecondary" variant="caption" sx={{ display: "flex", alignItems: "center" }}>
              Find out how you can help.
            </Typography>
          </CardContent>
        </CardActionArea>
        <IconButton size="small" aria-label="Close Button" color="secondary" sx={{
          position: "absolute",
          top: "4px",
          right: "4px",
        }} onClick={onClickClose}>
          <Close aria-hidden={true} fontSize="small" />
        </IconButton>
      </Card>
    } />
  );
}
