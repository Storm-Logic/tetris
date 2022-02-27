// socket.js
const { Server } = require("socket.io");
const { ROWS, COLS, createBoard, randomPiece, collide, rotate } = require("./tetrisLogic");

// In-memory rooms store
const rooms = {};
const sockets = {};

function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("refresh", ({ userid }) => {
      sockets[userid] = socket.id;
      let room = null;
      for (const id in rooms) {
        const r = rooms[id];
        if (r.user1.id === userid || r.user2.id === userid) {
          room = r;
          console.log("kkkkkkkkk", userid, room);
          break;
        }
      }

      if (room) {
        console.log("Emitting refreshed for room:", room);
        socket.emit("refreshed", room);
      } else {
        console.log("Emitting refreshed for all rooms");
        socket.emit("refreshed", rooms);
      }
    });

    socket.on('hardDrop', ({ Room }) => {
      console.log("Hard drop received for room:", Room);
      io.to(sockets[Room.user1.id]).emit("opponentHardDrop");
      io.to(sockets[Room.user2.id]).emit("opponentHardDrop");
    });
    socket.on("createRoom", ({ id }) => {
      console.log("888");

      const roomId = Math.random().toString(36).substring(2, 8);

      const room = {
        roomid: roomId,
        user1: {
          id: id,
          board: null,
          piece: null,
        },
        user2: {
          id: null,
          board: null,
          piece: null,
        },
        roomState: false
      };

      rooms[roomId] = room;
      socket.join(roomId);
      socket.emit("roomCreated", { room });
      io.emit("refreshed", rooms);
    });
    // socket.on("moveDown", ({ Room }) => {
    //   console.log("Moving down");
    //   io.to(Room).emit("opponentMoveDown");
    // });

    socket.on("joinRoom", ({ id, roomid }) => {
      console.log("999", id);

      const room = rooms[roomid];
      console.log("555", room);

      if (!room) {
        socket.emit("joinedRoomFailure", { message: "Room not found" });
        return;
      }

      if (room.user2.id) {
        console.log("777");
        socket.emit("joinedRoomFailure", { message: "Room is full" });
        return;
      }

      console.log("666");
      // initialize boards and pieces
      

      room.user2 = { id: id, board: null, piece: null };

      io.to(sockets[room.user1.id]).emit("bothJoined", { room });
      io.to(sockets[room.user2.id]).emit("joinedRoom", { room });
      socket.broadcast.emit("refreshed", rooms);
    });
  });

  return io;
}

module.exports = { initSocket };
