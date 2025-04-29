import * as restify from "restify";
import connectMongo from "./configs/mongo.config";
import * as dotenv from "dotenv";
import { Server as SocketIoServer } from "socket.io";
import { handleSocketConnection } from "./controllers/socket.controller";

dotenv.config();
connectMongo();

const respond = (
  req: restify.Request,
  res: restify.Response,
  next: restify.Next
) => {
  res.send("Server started!");
  next();
};

const server = restify.createServer();
const io = new SocketIoServer(server.server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

handleSocketConnection(io);

server.use(restify.plugins.bodyParser());
server.get("/", respond);
server.head("/", respond);

server.listen(3000, () => {
  console.log("%s listening at %s", server.name, server.url);
});
