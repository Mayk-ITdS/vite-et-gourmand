import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  components: {
    MuiPaper: {
      variants: [
        {
          props: { variant: "glass" },
          style: {
            background: "rgba(20, 18, 16, 0.42)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            border: "1px solid rgba(255,255,255,0.10)",
            boxShadow: `0 24px 64px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.10)`,
            position: "relative",
          },
        },
      ],
    },
  },

  palette: {
    mode: "dark",
    background: {
      default: "transparent",
      paper: "transparent",
    },
  },
});
export { darkTheme };
