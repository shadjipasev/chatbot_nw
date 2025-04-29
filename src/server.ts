import * as restify from "restify";
import connectMongo from "./configs/mongo.config";
import * as dotenv from "dotenv";

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
server.use(restify.plugins.bodyParser());
server.get("/", respond);
server.head("/", respond);

server.listen(3000, () => {
  console.log("%s listening at %s", server.name, server.url);
});
