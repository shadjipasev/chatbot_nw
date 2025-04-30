import { openai } from "../server";
import { BlockTypes, IBlock } from "src/models/types/config.interface";

export const intentDetection = async (
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
    const recognisedIntent = response.choices[0].message.content;
    console.log(recognisedIntent);
  } catch (error) {
    console.log("Error detecting intents:", error);
    throw error;
  }
};

// export const writeMessage = async (
//   configBlock: IBlock,
// ){
//   if(configBlock.id === 'start_block'){
//     // get block
//   }

// }
