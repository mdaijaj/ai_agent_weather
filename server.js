import OpenAI from "openai";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const client = new OpenAI({
    apiKey: OPENAI_API_KEY,
});

// TOOLS
const weatherDetials = async (city = "") => {
    if (city.toLowerCase() === "delhi") return `The weather in ${city} is 30°C`;
    else if (city.toLowerCase() === "mumbai") return `The weather in ${city} is 28°C.`;
    else if (city.toLowerCase() === "jaipur") return `The weather in ${city} is 35°C with low humidity.`;
    else if (city.toLowerCase() === "bihar") return `The weather in ${city} is 32°C with moderate humidity.`;
    else if (city.toLowerCase() === "banglore") return `The weather in ${city} is 26°C with high humidity.`;
    else return `Sorry, I don't have the weather information for ${city} right now.`;
}

const SystemPrompt = `You are a AI assistant with START, PLAN, ACTION, OBSERVATION, and Output State.
1. Wait for user input and first PLAN using the available tools.
2. After Planing , take  the ACTION using the available tools and wait for Observation and output state.
3. After getting the observation, take Return the AI response based on START Propmt and observation and output state.
4. Repeat this process until you reach the final output state.
5. Finally, provide the final answer to the user based on the observations and output state.

Available Tools:
1. function weatherDetials: Get the weather details of a city.
   Input: city name (string)

Example:
{"type": "user", "user": "what is the sum of weather of delhi and mumbai."}
{"type": "plan", "plan": "I will be get weatherDetials of delhi."}
{"type": "action", "function": "weatherDetials", "input": " delhi "}
{"type": "observation", "observation": "The weather in delhi is 30°C "}
{"type": "plan", "plan": "I will be get weatherDetials of mumbai."}
{"type": "action", "function": "weatherDetials", "input": " mumbai "}
{"type": "observation", "observation": "The weather in mumbai is 28°C."}
{"type": "output", "output": "The sum of weather in delhi and mumbai is 58°C."}
`;


const user = "hey, what is the weather in delhi?";

const chat = async () => {
    const result = await client.chat.completions.create({
        model: "gpt-4o",
        messages: [
            { role: "system", content: SystemPrompt },
            { role: "user", content: user },
            { role: "assistant", content: "Sure, let me check the weather for you." },
            { role: "function", name: "get_weather", content: JSON.stringify({ city: "delhi" }) }
        ],
    })

    console.log("Result: ", result.choices[0].message);
}

chat();