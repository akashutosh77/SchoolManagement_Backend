import { Server } from "socket.io";
import { db } from "./db";

let io: Server;

export const initializeSocket = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: "*", // Allow frontend connections
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected to WebSocket");

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  // Start listening for attendance updates
  setInterval(listenForAttendanceUpdates, 5000); // Poll every 5 seconds
};

export const emitAttendanceUpdate = () => {
  io.emit("attendanceUpdated", { message: "Attendance data updated" });
};

async function listenForAttendanceUpdates() {
  try {
    const result = await db.request().query(`
        WAITFOR (RECEIVE TOP(1) * FROM AttendanceQueue), TIMEOUT 5000;
    `);
    if (result.recordset.length > 0) {
      io.emit("attendanceUpdated", result.recordset);
    }
  } catch (error) {
    console.error("Error listening for attendance updates:", error);
  }
}
