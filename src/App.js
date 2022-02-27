import './App.css';
import zotzot from './petr_sus.PNG';
import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import DropDown from './Components/dropdown.js';
import PrimarySearchAppBar from './Components/Searchbar.js';
import { styled, createTheme, ThemeProvider } from '@mui/system';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

//import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

var socket = new WebSocket('wss://fca5-169-234-58-122.ngrok.io/');

//customTheme and myThemeComponent are to style() the div for the forum post
const customTheme = createTheme({
//   palette: {
//     primary: {
//       main: '#1976d2',
//       contrastText: 'white',
//     },
//   },
// });
components: {
  MyThemeComponent: {
    styleOverrides: {
      root: {
        color: 'darkslategray',
      },
      primary: {
        color: 'darkblue',
      },
    },
    variants: [
      {
        props: { variant: 'dashed', color: 'primary' },
        style: {
          border: '1px dashed darkblue',
        },
      },
    ],
  },
},
});

const MyThemeComponent = styled('div', {
  // Configure which props should be forwarded on DOM
  shouldForwardProp: (prop) =>
    prop !== 'color' && prop !== 'variant' && prop !== 'sx',
  name: 'MyThemeComponent',
  slot: 'Root',
  // We are specifying here how the styleOverrides are being applied based on props
  overridesResolver: (props, styles) => [
    styles.root,
    props.color === 'primary' && styles.primary,
  ],
})(({ theme }) => ({
  backgroundColor: 'aliceblue',
  padding: theme.spacing(1),
}));

export const socketContext = React.createContext();
export const portContext = React.createContext();

function App() {
  const [text, setText] = React.useState([]);
  useEffect(function (){
    socket.onmessage = function(event) {
      var message = event.data;
      console.log(message);
      setText(JSON.parse(message));
    };
  }, [])

  return (

    <socketContext.Provider value ={socket}>
    <portContext.Provider value ={socket}>
    <div>
    <div>

      <PrimarySearchAppBar/>
      <div style={{marginLeft: '90%'}}>
           
          </div>
          </div>
        <DropDown/>
        <div style={{marginLeft: '20%', marginRight:'20%'}}>
        {text.map(el => (
            <>
            <div style = {{paddingTop: "5px", paddingBottom: "5px"}}>
            <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
    >
      <Toolbar>
      {/* <button onClick={alert("You are interested in this session")}>
          <img src={zotzot} alt='this is anteater image'/>
      </button> */}
      <img src={zotzot} onClick={() => alert("You are interested in this session")}/>

      <span style={{ 
        width: '100%',
        marginLeft: '.5rem',
        fontFamily: 'Cambria', 
      }}>
        {`${el.school} ${el.course_code}`}
      </span>
      
        <Grid container spacing={2} alignItems="center">
        </Grid>
      </Toolbar>
    </AppBar>
    <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
    <div style={{ 
        fontFamily: 'Cambria', 
    }}
    >
      {el.post} 
    </div>
    </Typography>
  </Paper>
  </div>
            </>
        ))}
        </div>
    </div>
    </portContext.Provider>
    </socketContext.Provider>
  );
}

export default App;