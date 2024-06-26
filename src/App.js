import logo from './logo.svg';
import './App.css';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios'
import { useState, useEffect } from 'react';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    '&::before, &::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&::before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    '&::after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
}));

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));

function App() {
  const [prediction, setPrediction] = useState(null);
  const [humidity, setHumidity] = useState("");
  const [temp, setTemp] = useState("")
  const [pumpState, setPumpState] = useState(0);
  const circleStyleRed = {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    border: '5px solid red',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '24px',
  };
  const circleStyleBlue = {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    border: '5px solid blue',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '24px',
  };
  const circleStyleLight = {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    border: '5px solid yellow',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '24px',
  };
  const circleStyleGreen = {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    border: '5px solid green',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '24px',
  };
  const pumpEngine = async() => {
    console.log('Pump engine')
    setPumpState(!pumpState);
    if(pumpState===true) await axios.get('https://blr1.blynk.cloud/external/api/update?token=zQ96W7gGJgikPR16B-O9AtWzieQkqzN6&V3=1');
    else await axios.get('https://blr1.blynk.cloud/external/api/update?token=zQ96W7gGJgikPR16B-O9AtWzieQkqzN6&V3=0')
    console.log(pumpState);
  }
  useEffect(() => {
    // Function to generate random data
    const generateRandomData = () => {
      return Math.random() * 100; // You can adjust this based on your data requirements
    };

    
    // Making the API call
    const fetchData = async () => {
      try {
        const temperatureResponse = await axios.get('https://blr1.blynk.cloud/external/api/get?token=zQ96W7gGJgikPR16B-O9AtWzieQkqzN6&V6');
        const humidityResponse = await axios.get('https://blr1.blynk.cloud/external/api/get?token=zQ96W7gGJgikPR16B-O9AtWzieQkqzN6&V5');
        const moistureResponse = await axios.get('https://blr1.blynk.cloud/external/api/get?token=zQ96W7gGJgikPR16B-O9AtWzieQkqzN6&V4');
        //console.log(temperatureResponse.data);
        setHumidity(humidityResponse.data);
        setTemp(temperatureResponse.data);
        const response = await axios.post('https://fepbackend.onrender.com/predict/', {
          LeafHumidity: humidityResponse.data,
          PlantAge: generateRandomData(),
          SunExposureLevel: temperatureResponse.data
        });

        setPrediction(response.data); // Saving the prediction in state
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching prediction:', error);
        // Handle error
      }
    };

    fetchData(); // Call fetchData when component mounts or refreshes
  }, []); // Empty dependency array means this effect runs only once when component mounts

  return (
    <div className="App" >
      <h1>Dashboard</h1>

      <h3>Sensor Data</h3>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap'}}>
      <div style={{height:'250px', width:'200px', margin: '20px', borderRadius: '25px', boxShadow: '0 2px 4px rgba(20, 0, 0, 0.1)'}}>
      <div>
          <div style={{justifyContent:'center', alignItems: 'center'}}>
          <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}><h3>Temperature </h3><img src="/thermo.png" alt="" height={40} width={40}/> </div>
          
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <h1 style={circleStyleRed}><p>{temp}</p>&deg;</h1>
          </div>
          
          </div>
          
          
        </div>
      </div>
      <div style={{height:'250px', width:'200px', margin: '20px', borderRadius: '25px', boxShadow: '0 2px 4px rgba(20, 0, 0, 0.1)'}}>
      <div>
          <div style={{justifyContent:'center', alignItems: 'center'}}>
          <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}><h3>Soil Moisture</h3> <img src="/moist.png" alt="" height={40} width={40}/></div>
          
          <div style={{display: 'flex', justifyContent: 'center'}}>
          <h1 style={circleStyleBlue}><p>{humidity}</p>%</h1>
          </div>
          
          </div>
          
          
        </div>
      </div>
      <div style={{height:'250px', width:'200px', margin: '20px', borderRadius: '25px', boxShadow: '0 2px 4px rgba(20, 0, 0, 0.1)'}}>
      <div>
          <div style={{justifyContent:'center', alignItems: 'center'}}>
          <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}><h3>Light Intensity</h3> <img src="/light.png" alt="" height={40} width={40}/></div>
          
          <div style={{display: 'flex', justifyContent: 'center'}}>
          <h1 style={circleStyleLight}>Very Sunny</h1>
          </div>
          
          </div>
          
          
        </div>
      </div>
      <div style={{height:'250px', width:'200px', margin: '20px', borderRadius: '25px', boxShadow: '0 2px 4px rgba(20, 0, 0, 0.1)'}}>
      <div>
          <div style={{justifyContent:'center', alignItems: 'center'}}>
          <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}> <h3>Plant Health</h3> <img src="/plant.png" alt="" height={40} width={40}/></div>
          
          <div style={{display: 'flex', justifyContent: 'center'}}>
          <h1 style={circleStyleGreen}>{prediction?.PlantHealth[0]>0? 'Good':'Poor'}</h1>
          
          </div>
          <p>Machine Learning Model</p>
          </div>
          
          
        </div>
      </div>
      </div>
      <h3>Actuators</h3>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap'}}>
      {/* <div style={{height:'200px', width:'200px', margin: '20px', borderRadius: '25px', boxShadow: '0 2px 4px rgba(20, 0, 0, 0.1)'}}> */}
        {/* <div>
          <div style={{justifyContent:'center', alignItems: 'center', marginTop: '60px'}}>
          <h3>Shade</h3>
          
          <div style={{display: 'flex', justifyContent: 'center'}}>
          <Typography>Off</Typography>
          <div style={{margin: '4px'}}>
          <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
          </div>
            
          <Typography>On</Typography>
          </div>
          
          </div>
          
          
        </div> */}
        
      {/* </div> */}
      <div style={{height:'200px', width:'200px', margin: '20px', borderRadius: '25px', boxShadow: '0 2px 4px rgba(20, 0, 0, 0.1)'}}>
      <div>
          <div style={{justifyContent:'center', alignItems: 'center', marginTop: '60px'}}>
          <h3>Water pump</h3>
          
          <div style={{display: 'flex', justifyContent: 'center'}}>
          <Typography>Off</Typography>
          <div style={{margin: '4px'}}>
          <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} onClick={pumpEngine}/>
          </div>
            
          <Typography>On</Typography>
          </div>
          
          </div>
          
          
        </div>
      </div>
      
      </div>
    </div>
  );
}

export default App;
