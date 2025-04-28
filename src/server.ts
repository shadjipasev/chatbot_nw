import * as restify from "restify";

const respond = (
  req: restify.Request,
  res: restify.Response,
  next: restify.Next
) => {
  res.send("Server started!");
  next();
};

const server = restify.createServer();
server.get("/", respond);
server.head("/", respond);

server.listen(3000, () => {
  console.log("%s listening at %s", server.name, server.url);
});
