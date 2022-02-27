import React, {useState, useEffect}from 'react';
import { useNavigate } from 'react-router-dom';
import socket from '../socket';
import '../styles/gameRoom.css';

export default function GameRoom() {
  const navigate = useNavigate();
  const [board1, setBoard1] = useState(
    Array.from({ length: 20 }, () => Array(10).fill(0))
  );
  const [piece1, setPiece1] = useState({x: 0, y: 0, shape: [[0,0,0],[0,0,0],[0,0,0]]});
  const [board2, setBoard2] = useState(Array.from({ length: 20 }, () => Array(10).fill(0)));
  const [piece2, setPiece2] = useState({x: 0, y: 0, shape: [[0,0],[0,0]]});
  const [Room, setRoom] = useState(null);

  const id = localStorage.getItem("id");

  // function moveDown() {
  //   console.log("Moving down piece");
  //   socket.emit("moveDown", { Room });
  // };
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log("Auto moving down");
  //     moveDown();
  //   }, 1000);
  //   return () => clearInterval(interval);
  // });
  function drop() {
    console.log("Hard drop piece");
    socket.emit("hardDrop", { Room });
  }



  useEffect(() => {
    const handleKey = e => {
      // if (e.key === "ArrowLeft") move(-1);
      // if (e.key === "ArrowRight") move(1);
      // if (e.key === "ArrowDown") moveDown();
      // if (e.key === "ArrowUp") rotatePiece();
      if (e.key === " ") drop();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  useEffect(() => {
    socket.emit("refresh", { userid: id });

    socket.on("refreshed", (room) => {
      console.log("Refreshed room data", room);
      setRoom(room);
      if (room.user2.id === null)
        console.log("Room created", room);
      else console.log("Room joined", room);
    });

    socket.on("bothJoined", ({ room }) => {
      console.log("Both players joined", room);

      // start interval
    });

    socket.on("opponentMoveDown", () => {
      console.log("Opponent moved down");
      
    });
    socket.on("opponentHardDrop", () => {
      console.log("Opponent hard dropped");
      
    });
    return () => {
      socket.off("bothJoined");
      socket.off("opponentMoveDown");
      socket.off("opponentHardDrop");
      socket.off("refreshed");
    };
  }, []);

  return (
    <div className="continer">
      <div className="app">
      <h1>Tetris (CRA)</h1>
      {/* {gameOver && <div className="game-over">Game Over</div>} */}

      <div className="board">
        {board1.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${y}-${x}`}
              className={`cell ${cell ? "filled" : ""}`}
            />
          ))
        )}

        {piece1.shape.map((row, y) =>
          row.map(
            (v, x) =>
              v && (
                <div
                  key={`p-${y}-${x}`}
                  className="cell active"
                  style={{
                    left: (piece1.x + x) * 24,
                    top: (piece1.y + y) * 24,
                  }}
                />
              )
          )
        )}
      </div>

      <p className="controls">
        ← → move | ↑ rotate | ↓ soft drop | space hard drop
      </p>
      </div>
      <div className="app">
      <h1>React Tetris (CRA)</h1>
      {/* {gameOver && <div className="game-over">Game Over</div>} */}

      <div className="board">
        {board2.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${y}-${x}`}
              className={`cell ${cell ? "filled" : ""}`}
            />
          ))
        )}

        {piece2.shape.map((row, y) =>
          row.map(
            (v, x) =>
              v && (
                <div
                  key={`p-${y}-${x}`}
                  className="cell active"
                  style={{
                    left: (piece2.x + x) * 24,
                    top: (piece2.y + y) * 24,
                  }}
                />
              )
          )
        )}
      </div>

      <p className="controls">
        ← → move | ↑ rotate | ↓ soft drop | space hard drop
      </p>
      </div>
    </div>
  );
}
