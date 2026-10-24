import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Login from './pages/login.js'
import Logup from './pages/Logup.js';
import Lobby from './pages/lobby.js';
import GameRoom from './pages/GameRoom.js';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Logup />} />
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/gameroom" element={<GameRoom />} /><Route path="/gameroom" element={<GameRoom />} /><Route path="/gameroom" element={<GameRoom />} />
        </Routes>
      </ Router>
    </div>
  );
}

export default App;
