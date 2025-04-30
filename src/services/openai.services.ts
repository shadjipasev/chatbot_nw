import { openai } from "../server";

export const intentDetection = async (userResponse: string) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",

      messages: [
        {
          role: "system",
          content:
            "You are an assistant that identifies the user's intent from their message. Possible intents include: 'weather', 'travel', 'restaurant'. Respond with only the intent.",
        },
        { role: "user", content: userResponse },
      ],
      //   response_format: { type: "json_object" },
      temperature: 0.2,
    });
    console.log(response.choices[0].message.content);
  } catch (error) {
    console.log("Error detecting intents:", error);
    throw error;
  }
};
