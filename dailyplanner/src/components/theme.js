
import { createTheme, ThemeProvider, alpha } from '@mui/material/styles';
import {shadows} from '@mui/system';

const bgcolor=alpha('#ffffff', 0.5);

export const theme = createTheme({
    palette: {
      primary: {
        main: bgcolor,
      }
    },
    typography: {
      fontFamily: 'Times New Roman',
    },
    
    components: {
      // Name of the component\
      MuiAppBar: {
        styleOverrides: {
            root: {
              backgroundColor: 'transparent',
              transform: 'scale(0.8),'
            }
        }
      },
      MuiTextField: {
        defaultProps: {
          InputLabelProps: {
            sx: {
              color: 'black', // Replace with your preferred color
              '&.Mui-focused': {
                color: 'black', // Adjust for focused state
              },
            },
          },
        },
      },
    
    
      MuiContainer: {
        styleOverrides: {
          root: {
            fontSize: '1rem',
            transform: "scale(0.8)",
            marginLeft: '0',
            backgroundColor: bgcolor,
          
            boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.3)',
            borderRadius: '1.25rem',
          }
        }
      },
      MuiTableContainer: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            fontSize: '1rem',
            transform: "scale(0.8)",
            marginLeft: '0',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            padding: 15,
            boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.3)',
            borderRadius: '1.25rem',
            
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
            root: {
                align: 'center',
                padding: '2px',

            }
        }
      },
      MuiCheckbox: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            fontSize: '0.5rem',
            margin: '0',
            transform: "auto",
            '&.Mui-checked': {
              color: 'black'
            },
            border: 'none',

            
          }
      },
    },
    MuiButtonBase: {
      
        defaultProps: {
          disableRipple: true, 
        },
      
      
    },
      MuiButton: {
        styleOverrides: {
          // Name of the slot
          root: {
            backgroundColor: 'white',
            '&:hover' : {
              opacity: 0.7,
              backgroundColor: 'white',
            },
             borderRadius: '1.25rem', 
             color: 'black',
              boxShadow: '1',
              backgroundColor: 'white',
             
             
          }
      }
      },
      MuiPaper: {
        styleOverrides: {
          // Name of the slot
          root: {
             my: 2,
             borderRadius: '0.625rem',
          }
      }
      },
      MuiBox: {
        styleOverrides: {
          root: {
            boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.3)',
            borderRadius: '1.125rem',
          }
        }
      },
      MuiTypography: {
        styleOverrides: {
          root: {
              fontWeight: 'bold'
          }
        }
      }
    
  }
  });