import app from "./app";
import http from "http";
import { initializeSocket } from "./sockets"; // Import socket initialization

const normalizePort = (val: string | number): number | string | boolean => {
  const port = parseInt(val as string, 10);
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
};

const onError = (error: NodeJS.ErrnoException): void => {
  if (error.syscall !== "listen") throw error;
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = (): void => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  console.log("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
initializeSocket(server); // Initialize the socket here

server.on("error", onError);
server.on("listening", onListening);
server.listen(port);
