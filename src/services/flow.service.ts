import { getMostRecentConfig } from "./chatbot-config.service";
import { sendMessageToClient } from "./socket.service";

export const sendInitialMessage = async () => {
  const config = await getMostRecentConfig();

  //   console.log("config -- " + config);
  //   console.log("config.startBlock -- " + config.startBlock);

  const startingBlock = config.blocks.find((block) => {
    // console.log("block.id -- " + block.id);
    return block.id === config.startBlock;
  });

  console.log("startingBlock -- " + startingBlock);

  await sendMessageToClient(startingBlock.content);
};
