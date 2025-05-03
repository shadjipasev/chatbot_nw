import { Server as SocketIoServer } from "socket.io";
import * as ioc from "socket.io-client";
import * as restify from "restify";
import { createApp } from "../src/server";

jest.setTimeout(20000);

describe("Socket Controller", () => {
  let clientSocket: ioc.Socket;
  let io: SocketIoServer;
  let server: restify.Server;

  beforeAll(async () => {
    const app = await createApp();
    server = app.server;
    io = app.io;
    clientSocket = ioc.connect("http://localhost:3000");
  });

  afterAll((done) => {
    io.close();
    clientSocket.close();
    done();
  });

  describe("basic comunication", () => {
    it("should communicate", (done) => {
      io.emit("echo", "Hey");
      clientSocket.once("echo", (message) => {
        expect(message).toBe("Hey");
      });
      done();
      io.on("connection", (mySocket) => {
        expect(mySocket).toBeDefined();
      });
    });
  });
});
