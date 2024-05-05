"use server";

import { createAI, createStreamableUI } from "ai/rsc";
import LoadingSkeleton from "../loading";
import { Card, CardContent } from "@/components/ui/card";
import { Suspense } from "react";
import Image from "next/image";
import { WeatherModel } from "../models/weather";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export const WeatherAI: any = createAI({
  actions: {
    getWeather,
  },
});

export async function getProfile(query: string) {
  const profileUI = createStreamableUI();

  profileUI.done(
    <div className="flex justify-start gap-5 items-start my-3">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-2">
        <p>User</p>
        <p>{query}</p>
      </div>
    </div>
  );

  return profileUI.value;
}

export async function getWeather(query: string) {
  const weatherUI = createStreamableUI();
  weatherUI.update(<LoadingSkeleton />);

  setTimeout(async () => {
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${query}&aqi=no
        `
      );
      const result = await response.json();
      const weather = result as WeatherModel;

      if (!response.ok) {
        const message = result?.error?.message;
        weatherUI.done(
          <div className="flex justify-start gap-5 items-start my-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>WA</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-2">
              <p>Weather API</p>
              <p>{message}</p>
            </div>
          </div>
        );
      }
      weatherUI.done(
        <div className="my-3">
          <div className="flex justify-start gap-5 items-start mb-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>WA</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-2">
              <p>Weather API</p>
            </div>
          </div>
          <Card className="m-5 py-3 w-1/2">
            <CardContent>
              <Suspense>
                <Image
                  src={`https:${weather.current.condition.icon}`}
                  alt="Photo by Drew Beamer"
                  width={80}
                  height={80}
                  className="rounded-md object-cover w-auto h-auto"
                />
              </Suspense>
              <p>
                {weather.location.name}, {weather.location.country}
              </p>
              <p>{weather.current.condition.text}</p>
              <p>Temperature: {weather.current.temp_c}°C</p>
              <p>Humidity: {weather.current.humidity}g/cm³</p>
            </CardContent>
          </Card>
        </div>
      );
    } catch (error) {}
  }, 1000);

  return weatherUI.value;
}
