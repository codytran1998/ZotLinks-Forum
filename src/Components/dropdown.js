import React, {useState} from 'react';
import Box from '@material-ui/core/Box';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { useEffect } from 'react';
import {socketContext} from '../App.js';

var socket = new WebSocket('wss://fca5-169-234-58-122.ngrok.io/');
export default function DropDownBar() {
    const [school, setSchool] = React.useState('');
    const [course, setCourse] = React.useState('')

    const socket = React.useContext(socketContext)
    const changeSchool = (school) => {
      setSchool(school.target.value);
    };

    const changeCourse = (course) => {
      setCourse(course.target.value);
    }

    const handleFilter = () => {
      var datasent = "FILTER" + ";;;" + school + ";;;" + course
      console.log(datasent)
      socket.send(datasent); // Sends data to server.
    };

    const [text, setText] = React.useState([]);
    useEffect(function (){
    socket.onmessage = function(event) {
      var message = event.data;
      console.log(message);
      setText(JSON.parse(message));
    };
  }, [])
    
 
  return (
      <div style = {{display:"flex","align-items":"center"}}>
        <FormControl variant = "standard" sx ={{m:1,minWidth:120}}>
      <InputLabel id = "select-school-label">School</InputLabel>

        <Select 
          labelId ="select-school-label"
          id = "select-school"
          value = {school}
          label = "School"
          onChange={changeSchool}
          >
          <MenuItem value = "">
            <em>None</em>
          </MenuItem>
          <MenuItem value="ICS">ICS</MenuItem>
          <MenuItem value="Math">Math</MenuItem>
          <MenuItem value="Biology">Biology</MenuItem>
          </Select>
          </FormControl>

        <FormControl variant = "standard" sx ={{m:1,minWidth:120}}>
      <InputLabel id = "select-class-label">Course</InputLabel>

        <Select 
          labelId ="select-class-label"
          id = "select-class"
          value = {course}
          label = "Course"
          onChange={changeCourse}
          >
          <MenuItem value = "">
            <em>None</em>
          </MenuItem>
          <MenuItem value="31">31</MenuItem>
          <MenuItem value="32">32</MenuItem>
          <MenuItem value="33">33</MenuItem>
          </Select>
          </FormControl>   
             
          <Button onClick={handleFilter}variant="contained" color = "success">Filter
          </Button>
          
          </div>
  );
}
