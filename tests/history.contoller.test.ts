import { ChatRole, IMessage } from "./../src/models/types/chat.interface";
import { IChatHistory } from "../src/models/chat-history.schema";
import { IBlock } from "../src/models/types/config.interface";
import { createApp } from "../src/server";
import { searchHistory } from "../src/services/flow.service";
import * as request from "supertest";

jest.mock("../src/services/flow.service");

describe("History Controller", () => {
  describe("GET /history", () => {
    it("should retreive conversation history by id", async () => {
      const app = (await createApp()).server;
      // const history: IChatHistory = {
      //     messages: IMessage[]
      // }
      const history: IChatHistory = {
        messages: <IMessage[]>[
          {
            role: "bot",
            message: "Hello!",
            currentBlock: <IBlock>{
              id: "start_block",
              type: "write_message",
              content: "Hello!",
              next: "wait_for_response",
            },
          },
        ],
      };
      (searchHistory as jest.Mock).mockResolvedValue(history);
      const id = "6813550987cc64c68451d6bf";
      const response = await request(app).get(`/history/${id}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: `Successfuly retrieved conversation history with id:${id}`,
        data: history,
      });
    });
  });
});
