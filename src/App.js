
import './App.css';
import Appbar from './components/Appbar';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Student from './components/Student';

function App() {
  return (
    <div className="App">
      <Appbar/> 
      <Student/>
    </div>
  );
}

export default App;
