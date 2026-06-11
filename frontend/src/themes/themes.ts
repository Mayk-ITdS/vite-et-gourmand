import { createTheme } from "@mui/material/styles";

const SANS =
  '"Inter Variable", "Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
const DISPLAY =
  '"Cormorant Garamond Variable", "Cormorant Garamond", Georgia, "Times New Roman", serif';
const MONO =
  '"JetBrains Mono Variable", "JetBrains Mono", "Fira Code", "Cascadia Code", Consolas, "Liberation Mono", monospace';

const darkTheme = createTheme({
  typography: {
    fontFamily: SANS,
    htmlFontSize: 16,
    fontSize: 14,

    h1: {
      fontFamily: DISPLAY,
      fontSize: "var(--text-4xl)",
      fontWeight: 500,
      lineHeight: 1.15,
      letterSpacing: "-0.022em",
    },
    h2: {
      fontFamily: DISPLAY,
      fontSize: "var(--text-3xl)",
      fontWeight: 500,
      lineHeight: 1.15,
      letterSpacing: "-0.022em",
    },
    h3: {
      fontFamily: DISPLAY,
      fontSize: "var(--text-2xl)",
      fontWeight: 500,
      lineHeight: 1.2,
      letterSpacing: "-0.018em",
    },
    h4: {
      fontFamily: DISPLAY,
      fontSize: "var(--text-xl)",
      fontWeight: 500,
      lineHeight: 1.35,
      letterSpacing: "-0.014em",
    },
    h5: {
      fontFamily: SANS,
      fontSize: "var(--text-lg)",
      fontWeight: 600,
      lineHeight: 1.35,
    },
    h6: {
      fontFamily: SANS,
      fontSize: "var(--text-base)",
      fontWeight: 600,
      lineHeight: 1.35,
      textTransform: "uppercase",
      letterSpacing: "0.08em",
    },

    subtitle1: { fontSize: "var(--text-lg)", lineHeight: 1.5, fontWeight: 500 },
    subtitle2: { fontSize: "var(--text-base)", lineHeight: 1.5, fontWeight: 500 },

    body1: {
      fontSize: "var(--text-base)",
      lineHeight: 1.6,
      letterSpacing: "-0.011em",
    },
    body2: {
      fontSize: "var(--text-sm)",
      lineHeight: 1.6,
      letterSpacing: "-0.006em",
    },

    button: {
      textTransform: "none",
      fontWeight: 500,
      fontSize: "var(--text-sm)",
      letterSpacing: "0.01em",
    },

    caption: {
      fontSize: "var(--text-xs)",
      lineHeight: 1.4,
      letterSpacing: "0.02em",
    },

    overline: {
      fontSize: "var(--text-xs)",
      fontWeight: 600,
      lineHeight: 1.5,
      textTransform: "uppercase",
      letterSpacing: "0.18em",
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        code: { fontFamily: MONO, fontSize: "0.9em" },
        kbd: { fontFamily: MONO, fontSize: "0.9em" },
        pre: { fontFamily: MONO, fontSize: "0.9em" },
        samp: { fontFamily: MONO, fontSize: "0.9em" },
      },
    },
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


