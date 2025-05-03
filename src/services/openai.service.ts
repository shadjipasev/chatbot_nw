import { openai } from "../server";
import {
  BlockTypes,
  IBlock,
  IChatConfig,
} from "src/models/types/config.interface";
import { getBlock } from "./chatbot-config.service";
import { InternalServerError } from "restify-errors";

export const intentDetection = async (
  configFlow: IChatConfig,
  userResponse: string,
  configBlock: IBlock
) => {
  const intents = configBlock.intents.map((e) => e.name);

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",

      messages: [
        {
          role: "system",
          content: `You are an assistant that identifies the user's intent from their message. Possible intents include: ${intents.join(
            ", "
          )}. Respond with only the intent.`,
        },
        { role: "user", content: userResponse },
      ],
      //   response_format: { type: "json_object" },
      temperature: 0.2,
    });
    const recognisedIntent = configBlock.intents.find(
      (intent) => intent.name === response.choices[0].message.content
    );

    // If no intent recognized - fallback
    if (!recognisedIntent) {
      console.log("Unable to determine. Please provide more information.");
      return getBlock(configFlow, configBlock.fallback);
    }

    console.log("33 (openai) recognisedIntent -" + recognisedIntent);
    // console.log("33 (openai) nextBlockId -" + nextBlockId);

    return getBlock(configFlow, recognisedIntent.next);
  } catch (error) {
    throw new InternalServerError({
      message: "Failed to create OpenAI chat completion.",
      cause: error,
    });
  }
};
