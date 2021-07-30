import React, { useState, useEffect } from "react";
import Axios from "axios";
import "@fontsource/roboto";
import "./App.css";
import {
  Button,
  AppBar,
  Tabs,
  Tab,
  makeStyles,
  Typography,
  Box,
  Grid,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core/";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    table: {
      minWidth: 650,
    },
  },
}));

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [run, setRun] = useState(0);
  const [Id, setId] = useState(0);

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const [list, setList] = useState([]);
  const [noti, setNoti] = useState([]);
  const [noti1, setNoti1] = useState([]);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) => {
      setList(response.data);
    });
  }, []);

  const register = () => {
    Axios.post("http://localhost:3001/register", {
      userName: name,
      userAge: age,
    }).then(function (response) {
      setNoti1(response.data);
      console.log(response.data);
    });
  };

  const update = (ID) => {
    Axios.put("http://localhost:3001/update", {
      ID: Id,
      runDistance: run,
    }).then(function (response) {
      setNoti(response.data);
      console.log(response.data);
    });
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="Register" href="/Register" {...a11yProps(0)} />
          <LinkTab label="Update Run" href="/Update Run" {...a11yProps(1)} />
          <LinkTab label="Result" href="/Result" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <h1>Run for your life!</h1>
      <TabPanel value={value} index={0}>
        <Grid
          container
          className={classes.root}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <h1>Register</h1>
          <label>Fisrt name & Last name</label>
          <TextField
            id="outlined-basic"
            variant="outlined"
            type="text"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <label>Age</label>
          <TextField
            id="outlined-basic"
            variant="outlined"
            type="number"
            onChange={(event) => {
              setAge(event.target.value);
            }}
          />
          <Button variant="contained" color="primary" onClick={register}>
            Submit
          </Button>
          <h1>{noti1}</h1>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid
          container
          className={classes.root}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <h1>Update Your Progress</h1>
          <label>How far you can run today?</label>
          <TextField
            id="outlined-basic"
            variant="outlined"
            type="text"
            label="ID"
            onChange={(event) => {
              setId(event.target.value);
            }}
          />
          <TextField
            id="outlined-basic"
            variant="outlined"
            type="Number"
            label="Km?"
            InputProps={{ inputProps: { min: 0, max: 10 } }}
            onChange={(event) => {
              setRun(event.target.value);
            }}
          />
          <Button variant="contained" color="primary" onClick={update}>
            Submit
          </Button>
          <h1>
            Your Progress is
            {noti.map((noti) => (
              <div>{noti.runDistance.toFixed(3)}</div>
            ))}
            Km
          </h1>
          <h1>When your progress reach to 42.195 Km you can get Medal</h1>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Grid
          container
          className={classes.root}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          {/* {list.map((val, key) => {
            return <div>{val.userName} {val.userAge} {val.runDistance}</div>
          })} */}
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Age</TableCell>
                  <TableCell align="right">Distance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list.map((list) => (
                  <TableRow key={list.userName}>
                    <TableCell component="th" scope="row">
                      {list.userName}
                    </TableCell>
                    <TableCell align="right">{list.userAge}</TableCell>
                    <TableCell align="right">{list.runDistance}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </TabPanel>
    </div>
  );
}

export default App;
