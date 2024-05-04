"use server";

import { createStreamableUI } from "ai/rsc";
import LoadingSkeleton from "../loading";

export async function getWeather() {
  const weatherUI = createStreamableUI();

  weatherUI.update(<LoadingSkeleton />);

  setTimeout(() => {
    weatherUI.done(<div>It is a sunny day!</div>);
  }, 1000);

  return weatherUI.value;
}
