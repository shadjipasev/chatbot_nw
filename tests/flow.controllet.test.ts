import * as ioc from "socket.io-client";
import * as restify from "restify";
import { Server as SocketIoServer } from "socket.io";
import { createApp } from "../src/server";
import { IBlock, IChatConfig } from "src/models/types/config.interface";
import { sendMessageToClient } from "src/services/socket.service";

describe("Flow Controller", () => {
  let clientSocket: ioc.Socket;
  let io: SocketIoServer;
  let server: restify.Server;
  let currentBlock: IBlock;

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

  describe("Test write_message type", () => {
    it("should send content of the block to client", async () => {
      const mockConfig: IChatConfig = {
        blocks: <IBlock[]>[
          {
            id: "weather_response",
            type: "write_message",
            content: "The weather is sunny",
            next: "anything_else",
          },
        ],
        startBlock: "start_block",
      };
      currentBlock = mockConfig.blocks[0];

      io.emit("write_message", currentBlock.content);
      clientSocket.once("write_message", (message) => {
        expect(message).toBe(currentBlock.content);
      });
      io.on("connection", (mySocket) => {
        expect(mySocket).toBeDefined();
      });
    });
  });
});
