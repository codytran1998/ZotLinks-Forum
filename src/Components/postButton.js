import React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {socketContext} from '../App.js'
import Button from '@mui/material/Button';


//<div style={{marginLeft: '45%', marginTop: '70%'}}>
//<PostButton/>


var socket = new WebSocket('wss://fca5-169-234-58-122.ngrok.io/');

export default function PostButton(){
    const [open, setOpen] = React.useState(false);
    const [display, setDisplay] = React.useState([]);
    const socket = React.useContext(socketContext)
    let post;
    let postArray;
    React.useEffect(() => {
        function handle(event) {
            console.log(event.data);
            post = event.data
            console.log(postArray)
            setDisplay(JSON.parse(post))
        }
    

        socket.addEventListener('message', handle);
        return () => socket.removeEventListener('message', handle);
    }, [])


  const [value, setValue] = React.useState('');

  const [course, setCourse] = React.useState('');

  const [school, setSchool] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePost = () => {
    var datasent = "CREATE" + ";;;" + school + ";;;" + course + ";;;" + value
    console.log(datasent)
    socket.send(datasent); // Sends data to server.
    setOpen(false);
  };

  return (
      <div>
          <div><Button variant="text">{post}</Button>
</div>
    <div>
      <div style = {{marginBottom: "20%"}}>
      <Button variant="contained" color = "success" onClick={handleClickOpen}>
        Create Post +
      </Button>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your study meetup information.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="School"
            type="school"
            fullWidth
            variant="standard"
            school = {school}
            onChange = {(event) => setSchool(event.target.value)}
          />
        </DialogContent>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Class"
            type="class"
            fullWidth
            variant="standard"
            course = {course}
            onChange = {(event) => setCourse(event.target.value)}
          />
        </DialogContent>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Post"
            type="post"
            fullWidth
            variant="standard"
            value = {value}
            onChange = {(event) => setValue(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handlePost}>Post</Button>
        </DialogActions>
      </Dialog>
    </div>
    </div>
  );
}
