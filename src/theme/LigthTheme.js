import { createTheme } from "@mui/material"

export const LigthTheme = createTheme({
  palette: {
    mode: 'light',
    type: 'light',
    primary: {
      main: '#1ea6fc',
    },
    secondary: {
      main: '#fdbb06',
    },
    info: {
      main: '#2196f3',
    },
    background: {
      paper: '#fff',
      default: '#EAEAEA',
    },
    nav:{
      header:'linear-gradient(90deg, rgba(0,120,219,1) 0%, rgba(0,138,237,1) 30%, rgba(30,167,252,1) 100%)',
      // header:'#fff',
      aside:'',
      background:''
    }
  },
  typography: {
    h1: {
      fontFamily: 'Manrope',
    },
    h2: {
      fontFamily: 'Manrope',
    },
    h4: {
      fontFamily: 'Manrope',
    },
    h3: {
      fontFamily: 'Manrope',
    },
    h5: {
      fontFamily: 'Manrope',
    },
    h6: {
      fontFamily: 'Manrope',
    },
  },
  components: {

    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          background: 'linear-gradient(90deg, rgba(0,120,219,1) 0%, rgba(0,138,237,1) 38%, rgba(30,167,252,1) 100%)',
          border: 0,
          borderRadius: 3,
          color: 'white',
        },
        containedSecondary:{
          background: 'linear-gradient(90deg, rgba(253,187,6,1) 0%, rgba(254,171,23,1) 100%)',
          border: 0,
          borderRadius: 3,
          color: 'white',
        }
      },
    },

    MuiList:{
      styleOverrides:{
        dense:true
      }
    },

    MuiMenuItem: {
      styleOverrides:{
        dense: true,
      }
    },

    MuiTable: {
      styleOverrides:{
        size: 'small',
      }
    },

    MuiTooltip:{
      styleOverrides:{
        arrow: true,
      }
    },
  },
})