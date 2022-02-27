import { useState, useEffect } from "react";
import socket from "../socket";
import { useNavigate } from "react-router-dom";
import "../styles/Lobby.css";

export default function Lobby() {
  const [Rooms, setRooms] = useState({});
  const id = localStorage.getItem("id");
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("refresh", { userid: id });

    socket.on("refreshed", (rooms) => {
      setRooms(rooms);
    });

    socket.on("joinedRoom", () => {
      navigate("/gameroom");
    });

    socket.on("joinedRoomFailure", ({ message }) => {
      alert(message);
    });

    socket.on("roomCreated", () => {
      navigate("/gameroom");
    });

    return () => {
      socket.off("roomCreated");
      socket.off("refreshed");
      socket.off("joinedRoom");
      socket.off("joinedRoomFailure");
    };
  }, [navigate]);

  const createRoom = () => {
    if (!id) console.log("please log in first");
    else socket.emit("createRoom", { id });
  };

  const joinRoom = (room) => {
    if (!id) console.log("please log in first");
    else socket.emit("joinRoom", { id, roomid: room.roomid });
  };

  const logOut = () => {
    localStorage.removeItem("id");
    navigate("/");
  };

  return (
    <div className="lobby-container">
      <h2>Lobby</h2>

      <div className="lobby-actions">
        <button className="create-btn" onClick={createRoom}>
          Create Room
        </button>
        <button className="logout-btn" onClick={logOut}>
          Log Out
        </button>
      </div>

      <h3>Room Activity</h3>

      {Rooms.length === 0 && (
        <p className="no-rooms">No rooms available</p>
      )}

      <div className="room-list">
        {Object.values(Rooms).map((room) => (
          <div className="room-card" key={room.roomid}>
            <p><strong>Room ID:</strong> {room.roomid}</p>
            <p><strong>User 1:</strong> {room.user1.id}</p>
            <p>
              <strong>User 2:</strong>{" "}
              {room.user2.id ? room.user2.id : "Waiting for player..."}
            </p>
            <button
              className="join-btn"
              onClick={() => joinRoom(room)}
            >
              Join
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}