import { createOpenAI } from "@ai-sdk/openai";
import { createAI, getMutableAIState, streamUI } from "ai/rsc";
import { z } from "zod";
import { WeatherModel } from "@/app/models/weather";
import LoadingSkeleton from "@/app/loading";
import { Card, CardContent } from "../ui/card";
import { ReactNode, Suspense } from "react";
import Image from "next/image";

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface ServerMessage {
  role: "user" | "assistant";
  content: string;
  name?: string;
}

export interface ClientMessage {
  id: number;
  role: "user" | "assistant" | "Weather API";
  display: ReactNode;
}
function WeatherCard({ weatherInfo }: Readonly<{ weatherInfo: WeatherModel }>) {
  return (
    <Card className="m-5 py-3">
      <CardContent>
        <Suspense>
          <Image
            src={`https:${weatherInfo.current.condition.icon}`}
            alt="Photo by Drew Beamer"
            width={80}
            height={80}
            className="rounded-md object-cover w-auto h-auto"
          />
        </Suspense>
        <p>
          {weatherInfo.location.name}, {weatherInfo.location.country}
        </p>
        <p>{weatherInfo.current.condition.text}</p>
        <p>Temperature: {weatherInfo.current.temp_c}°C</p>
        <p>Humidity: {weatherInfo.current.humidity}g/cm³</p>
      </CardContent>
    </Card>
  );
}

async function getWeatherDetails(location: string) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${location}&aqi=no
      `
    );

    const result = await response.json();
    if (!response.ok) {
      const message = result?.error?.message;
      throw Error(message);
    }
    const weather = result as WeatherModel;
    return weather;
  } catch (error: any) {
    console.log(error);
    if (error instanceof Error) {
      throw error;
    }
    throw Error("Unknown error please contact system administrator.");
  }
}

async function submitUserMessage(userInput: string): Promise<ClientMessage> {
  "use server";

  const aiState = getMutableAIState();

  aiState.update([
    ...aiState.get(),
    {
      role: "user",
      content: userInput,
    },
  ]);

  const ui = await streamUI({
    model: openai("gpt-3.5-turbo"),
    system: "You are a friendly weather assistant!",
    messages: [
      ...aiState.get(),
      { role: "assistant", content: "You are a weather assistant" },
    ],
    text: ({ content, done }) => {
      if (done) {
        aiState.done([
          ...aiState.get(),
          {
            role: "assistant",
            content,
          },
        ]);
      }

      return <p>{content}</p>;
    },
    tools: {
      get_weather_info: {
        description: "Get weather information given location",
        parameters: z
          .object({
            location: z
              .string()
              .describe("the location to get weather information"),
          })
          .required(),
        generate: async function* ({ location }) {
          yield <LoadingSkeleton />;

          try {
            const weatherInfo = await getWeatherDetails(location);

            aiState.done([
              ...aiState.get(),
              {
                role: "assistant",
                name: "get_weather_info",
                content: JSON.stringify(weatherInfo),
              },
            ]);

            return <WeatherCard weatherInfo={weatherInfo} />;
          } catch (error) {
            if (error instanceof Error) {
              return <div>{error?.message}</div>;
            }
          }
        },
      },
    },
  });

  return {
    id: Date.now(),
    role: "Weather API",
    display: ui.value,
  };
}

export const AI = createAI<ServerMessage[], ClientMessage[]>({
  actions: {
    submitUserMessage,
  },
  initialUIState: [],
  initialAIState: [],
});
