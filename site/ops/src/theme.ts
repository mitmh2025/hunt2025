import { createTheme } from "@mui/material/styles";

export default createTheme({
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          "&.MuiContainer-maxWidthLg": {
            maxWidth: "4800px",
          },
          // Add other classes as needed
        },
      },
    },
  },
});
