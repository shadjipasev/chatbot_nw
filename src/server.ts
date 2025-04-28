import * as restify from "restify";
import { Server } from "socket.io";

const respond = (
  req: restify.Request,
  res: restify.Response,
  next: restify.Next
) => {
  res.send("Server started!");
  next();
};

const server = restify.createServer();
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("a user connected");
});

server.get("/", respond);
server.head("/", respond);

server.listen(3000, () => {
  console.log("%s listening at %s", server.name, server.url);
});
