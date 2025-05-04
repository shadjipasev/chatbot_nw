import * as ioc from "socket.io-client";
import * as restify from "restify";
import { Server as SocketIoServer } from "socket.io";
import { createApp } from "../src/server";
import { IBlock, IChatConfig } from "../src/models/types/config.interface";
import { intentDetection } from "../src/services/openai.service";

jest.mock("../src/services/openai.service");

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
    it("should send content of the block to client", () => {
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

      clientSocket.once("write_message", (message) => {
        expect(message).toBe(currentBlock.content);
      });

      io.emit("write_message", currentBlock.content);

      io.on("connection", (mySocket) => {
        expect(mySocket).toBeDefined();
      });
    });
  });

  describe("Test detect_intent type", () => {
    const mockConfig: IChatConfig = {
      blocks: <IBlock[]>[
        {
          id: "detect_intent",
          type: "detect_intent",
          intents: [
            {
              name: "weather",
              next: "weather_response",
            },
          ],
          fallback: "not_understood",
        },
        {
          id: "weather_response",
          type: "write_message",
          content: "The weather today is sunny.",
          next: "anything_else",
        },
        {
          id: "not_understood",
          type: "write_message",
          content:
            "I'm sorry, I didn't understand that. I can talk only about weather, time and cars.",
          next: "detect_intent",
        },
      ],
      startBlock: "start_block",
    };

    currentBlock = mockConfig.blocks[0];

    it("detect correct intent and respond accordingly", async () => {
      const fallbackBlock = mockConfig.blocks[2].content;
      const message = "Is it sunny?";
      (intentDetection as jest.Mock).mockResolvedValue({
        mockConfig,
        message,
        currentBlock,
      });

      clientSocket.once("detect_intent", (clientMessage) => {
        expect(clientMessage).toBe(fallbackBlock);
      });
      io.emit("detect_intent", fallbackBlock);
      io.on("connection", (mySocket) => {
        expect(mySocket).toBeDefined();
      });
    });

    it("openai doesn't recognize intent", async () => {
      const message = "What is the time?";
      const intendedReply: IBlock = await intentDetection(
        mockConfig,
        message,
        currentBlock
      );
      clientSocket.once("fallback", (clientMessage) => {
        expect(clientMessage).toBe(intendedReply.content);
      });
      io.emit("fallback", intendedReply.content);
      io.on("connection", (mySocket) => {
        expect(mySocket).toBeDefined();
      });
    });
  });
});
