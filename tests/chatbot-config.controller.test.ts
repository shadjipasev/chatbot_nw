import { IBlock, IChatConfig } from "src/models/types/config.interface";
import * as request from "supertest";
import { createApp } from "../src/server";
import {
  createChatConfig,
  getMostRecentConfig,
} from "../src/services/chatbot-config.service";

jest.mock("../src/services/chatbot-config.service");

describe("Chatbot Config Controller", () => {
  //   jest.setTimeout(60000);

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

  describe("POST /config", () => {
    it("should create new configuration", async () => {
      const app = await createApp();

      (createChatConfig as jest.Mock).mockResolvedValue(mockConfig);
      const response = await request(app.server)
        .post("/config")
        .send(mockConfig);

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        message: "Configuration was successfully uploaded.",
        data: mockConfig,
      });
    });
  });

  describe("GET /config", () => {
    it("should retrieve latest chatbot configuration.", async () => {
      const app = await createApp();

      (getMostRecentConfig as jest.Mock).mockResolvedValue(mockConfig);
      const response = await request(app.server).get("/config");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: "Retrieving latest chatbot configuration.",
        data: mockConfig,
      });
    });
  });
});
