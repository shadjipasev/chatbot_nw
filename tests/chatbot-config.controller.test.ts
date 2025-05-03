import { IBlock, IChatConfig } from "src/models/types/config.interface";
import * as request from "supertest";
import { createApp } from "../src/server";
import { createChatConfig } from "../src/services/chatbot-config.service";

jest.mock("../src/services/chatbot-config.service");

describe("Chatbot Config Controller", () => {
  //   jest.setTimeout(60000);

  it("POST /config should create new configuration", async () => {
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
    (createChatConfig as jest.Mock).mockResolvedValue(mockConfig);
    const app = await createApp();
    const response = await request(app).post("/config").send(mockConfig);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      message: "Configuration was successfully uploaded.",
      data: mockConfig,
    });
  });
});
