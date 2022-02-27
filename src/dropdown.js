import React, {useState} from 'react';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';

export default function DropDownBar() {
    const [school, setSchool] = React.useState('');
    const [course, setCourse] = React.useState('')




    
 
  return (
      <div className = "name">
        <FormControl variant = "standard" sx ={{m:1,minWidth:120}}>
      <InputLabel id = "select-school-label">School</InputLabel>

        <Select 
          labelId ="select-school-label"
          id = "select-school"
          value = {school}
          label = "School"
          onChange={(school) => setSchool(school.target.value)}
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
      <InputLabel id = "select-class-label">class</InputLabel>

        <Select 
          labelId ="select-class-label"
          id = "select-class"
          value = {course}
          label = "Course"
          onChange={(course) => setCourse(course.target.value)}
          >
          <MenuItem value = "">
            <em>None</em>
          </MenuItem>
          <MenuItem value="ICS 31">ICS 31</MenuItem>
          <MenuItem value="ICS 32">ICS 31</MenuItem>
          <MenuItem value="ICS 33">ICS 33</MenuItem>
          </Select>
          </FormControl>
          <div>"Hello Wordasdfksdf"</div>
          <div>
          <Button variant="contained" color = "success">Filter
      </Button>
      </div>
      </div>
  );
}
