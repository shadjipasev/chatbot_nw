import { Server as SocketIoServer } from "socket.io";
import * as ioc from "socket.io-client";
import * as restify from "restify";
import { createApp } from "../src/server";
import { IBlock, IChatConfig } from "src/models/types/config.interface";

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

  describe("should send initial message", () => {
    it("should send content of starting block", async () => {
      const mockConfig: IChatConfig = {
        blocks: <IBlock[]>[
          {
            id: "start_block",
            type: "write_message",
            content: "Hello!",
            next: "wait_for_response",
          },
        ],
        startBlock: "start_block",
      };

      io.emit("initial_message", mockConfig.blocks[0].content);
      clientSocket.once("initial_message", (message) => {
        expect(message).toBe(mockConfig.blocks[0].content);
      });
      io.on("connection", (mySocket) => {
        expect(mySocket).toBeDefined();
      });
    });
  });
});
